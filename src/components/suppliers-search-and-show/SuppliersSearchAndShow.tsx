import React, {useEffect, useState} from "react";
import {SelectProps} from "antd/es/select";
import {FormItemProps} from "antd/es/form";
import {AutoComplete, Card, Col, Form, Input, notification, Row} from "antd";
import {FormInputSize} from "../../util/ComponentsUtil";
import {getSupplierByNumber, getSuppliers} from "../../api/SupplierApi";


class SupplierInfo{
  supplierNumber: string;
  supplierName: string;
  productionCategory: string;
  remarks: string;
  purchasingCategories: string;

  constructor(number: string, name: string, productionCategory: string, remarks: string, purchasingCategories: string) {
    this.supplierNumber = number;
    this.supplierName = name;
    this.productionCategory = productionCategory;
    this.remarks = remarks;
    this.purchasingCategories = purchasingCategories;
  }
}

interface SuppliersSearchAndShowProps {
  supplierNumberToShow?: string;
  isResetting?: any;
  setIsResetting?: any;
}

const SupplierSearchAndShow = (props:SuppliersSearchAndShowProps) => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const [supplierInfosResult, setSupplierInfosResult] = useState<SupplierInfo[]>([]);
  const [selectedSupplierNumber, setSelectedSupplierNumber] = useState<string>('');
  const [validateStatus, setValidateStatus] = useState<FormItemProps['validateStatus']>('');
  const supplierNumberToShow = props.supplierNumberToShow;  // 是否指定预先显示的商品编号
  const isResetting = props.isResetting;  // 重置状态，状态提升
  const setIsResetting = props.setIsResetting;
  const [supplierInfoToResetOnModifyingMode, setSupplierInfoToResetOnModifyingMode] = useState<SupplierInfo>();  // 修改时显示的默认供应商

  // 组件加载时判断是否需要预先显示供应商
  useEffect(() => {
    if(supplierNumberToShow){  // 需要预先显示商品
      reset();
    }
    if(isResetting){  // 处理重置时，目前重置时该effect生效2次，虽有重复但影响不大
      setIsResetting(false);
    }
  },[supplierNumberToShow, isResetting]);

  // 重置
  const reset = () => {
    if(supplierNumberToShow){  // 需要预先显示供应商
      // getSupplierInfo(supplierNumberToShow);
      // selectAndShow(supplierNumberToShow);
      if(!supplierInfoToResetOnModifyingMode){
        // 首次需要获取需要显示商品的信息
        const api_getSupplierByNumber = getSupplierByNumber(supplierNumberToShow);
        api_getSupplierByNumber.then(response => {
          let temp = response.data;
          let info:SupplierInfo = {
            supplierNumber: temp.supplierNumber, supplierName: temp.supplierName,
            purchasingCategories: temp.purchasingCategories, productionCategory: temp.productionCategory,
            remarks: temp.remarks
          };
          setSupplierInfoToResetOnModifyingMode(info);  // 首次获取之后进行记录，避免重置时重复获取
          setSupplierInfosResult([info]);
          selectAndShow(supplierNumberToShow);
        }).catch(reason => {
        });
      }
      else {  // 已经获取过，直接设置
        setSupplierInfosResult([supplierInfoToResetOnModifyingMode]);
        selectAndShow(supplierNumberToShow);
      }
    }
    else{
      setSelectedSupplierNumber('');
      setValidateStatus('error');
    }
  };

  // // 搜索供应商
  // const searchSupplier = (query: string) => {
  //   let result = [
  //     new SupplierInfo('LINING01', '李宁（北京）体育用品有限公司',
  //       '运动鞋服、体育器材', '一般合作商', '羽球系列'),
  //     new SupplierInfo('WILSON01', 'WILSON',
  //       '体育器材', '', '羽球系列')
  //   ];
  //   setSupplierInfosResult(result);
  //   return result;
  // };

  // 展示搜索结果
  const searchResult = (query: string) => {
    // const suppliers = searchSupplier(query);
    // 调用接口搜索
    const api_getSuppliers = getSuppliers({supplierNumber: query, num: 10});
    api_getSuppliers.then(response => {
      let suppliers = response.data.suppliersList;
      setSupplierInfosResult(suppliers.map((item: any) => {
        return {
          supplierNumber: item.supplierNumber,
          supplierName: item.supplierName,
          productionCategory: item.productionCategory,
          remarks: item.remarks,
          purchasingCategories: item.purchasingCategories
        };
      }));
      if(suppliers.length > 0 && suppliers[0].supplierNumber === query){    // 当输入的值就是搜索后最匹配的值时
        selectAndShow(query);
      };
      const results = suppliers.map((item: any, index:number) => {
        return {
          value: item.supplierNumber,
          label: (
            <Row>
              <Col xs={24} sm={10}>
                {item.supplierNumber}
              </Col>
              <Col xs={24} sm={14}>
                {item.supplierName}
              </Col>
              <Col xs={24} sm={10}>
                {item.productionCategory}
              </Col>
              <Col xs={24} sm={14}>
                {item.remarks}
              </Col>
            </Row>
          )
        }
      });
      setOptions(results);
    }).catch(reason => {
      notification.error({message: '发生了错误', description: reason.toString()});
    });
  };

  // 处理搜索输入
  const handleSearch = (value: string) => {
    if(value){
      searchResult(value);
    }
    setValidateStatus('error');
  };

  // 处理选择
  const onSelect = (value: string) => {
    console.log('onSelect', value);
    selectAndShow(value);
  };

  // 选择一个商品后显示信息
  const selectAndShow = (selectedSupplierNumber: string) => {
    setValidateStatus('success');   // 设置表单校验状态
    setSelectedSupplierNumber(selectedSupplierNumber);    // 选中了这个SupplierInfo
  }

  const getAndShowSupplierInfo = () => {
    if(validateStatus === 'success'){   // 已经选择
      // 找到对应的GoodsInfo
      let info = supplierInfosResult[0];
      for (let i = 0; i < supplierInfosResult.length; i++) {
        if(supplierInfosResult[i].supplierNumber === selectedSupplierNumber){
          info = supplierInfosResult[i];
        }
      }
      // 返回渲染
      return (
        <Row>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>供应商编号:</b> </Col>
              <Col>{info.supplierNumber}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>供应商名称:</b> </Col>
              <Col>{info.supplierName}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>生产类别:</b> </Col>
              <Col>{info.productionCategory}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>采购类别:</b> </Col>
              <Col>{info.purchasingCategories}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>备注:</b> </Col>
              <Col>{info.remarks}</Col>
            </Row>
          </Col>
        </Row>
      )
    }
    else {
      return (
        <div style={{textAlign: 'center'}}>
          请输入并选择一个供应商
        </div>
      )
    }
  }

  return (
    <Form.Item
      label={"供应商编号"}
    >
      <Form.Item
        name={"supplierNumber"}
        hasFeedback
        validateStatus={validateStatus}
        rules={[
          {
            required: true,
            message: '请输入供应商编号',
          }
        ]}
      >
        <AutoComplete
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search size={FormInputSize} placeholder="输入供应商编号搜索" />
        </AutoComplete>
      </Form.Item>
      <Card style={{marginTop: '1rem', height: '10rem', overflow: 'auto'}}>
        {getAndShowSupplierInfo()}
      </Card>
    </Form.Item>
  );
};

export default SupplierSearchAndShow;