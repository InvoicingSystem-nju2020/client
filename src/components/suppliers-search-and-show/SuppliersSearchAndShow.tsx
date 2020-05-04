import React, {useState} from "react";
import {SelectProps} from "antd/es/select";
import {FormItemProps} from "antd/es/form";
import {AutoComplete, Card, Col, Form, Input, Row} from "antd";
import {FormInputSize} from "../../util/ComponentsUtil";


class SupplierInfo{
  number: string;
  name: string;
  productionCategory: string;
  remarks: string;
  purchasingCategory: string;

  constructor(number: string, name: string, productionCategory: string, remarks: string, purchasingCategory: string) {
    this.number = number;
    this.name = name;
    this.productionCategory = productionCategory;
    this.remarks = remarks;
    this.purchasingCategory = purchasingCategory;
  }
}

const SupplierSearchAndShow: React.FC = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const [supplierInfosResult, setSupplierInfosResult] = useState<SupplierInfo[]>([]);
  const [selectedSupplierNumber, setSelectedSupplierNumber] = useState<string>('');
  const [validateStatus, setValidateStatus] = useState<FormItemProps['validateStatus']>('');

  // 展示搜索结果
  const searchResult = (query: string) => {
    const result = [
      new SupplierInfo('LINING01', '李宁（北京）体育用品有限公司',
        '运动鞋服、体育器材', '一般合作商', '羽球系列'),
      new SupplierInfo('WILSON01', 'WILSON',
        '体育器材', '', '羽球系列')
    ];
    setSupplierInfosResult(result);
    return result.map((item, index) => {
      return {
        value: item.number,
        label: (
          <Row>
            <Col xs={24} sm={10}>
              {item.number}
            </Col>
            <Col xs={24} sm={14}>
              {item.name}
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
  };

  // 处理搜索输入
  const handleSearch = (value: string) => {
    if(value){
      let results = searchResult(value);
      setOptions(results);
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
        if(supplierInfosResult[i].number === selectedSupplierNumber){
          info = supplierInfosResult[i];
        }
      }
      // 返回渲染
      return (
        <Row>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>供应商编号:</b> </Col>
              <Col>{info.number}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>供应商名称:</b> </Col>
              <Col>{info.name}</Col>
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
              <Col>{info.purchasingCategory}</Col>
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