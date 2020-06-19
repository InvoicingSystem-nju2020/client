import React, {useEffect, useState} from "react";
import {SelectProps} from "antd/es/select";
import {FormItemProps} from "antd/es/form";
import {AutoComplete, Card, Col, Form, Input, notification, Row, Select} from "antd";
import {FormInputSize} from "../../util/ComponentsUtil";
import {FormInstance} from "antd/lib/form/util";
import {getClientByNumber, getClients} from "../../api/ClientApi";


const { Option } = Select;

class ClientInfo{
  number: string;
  name: string;

  constructor(number: string, name: string) {
    this.number = number;
    this.name = name;
  }
}

interface ClientSearchProps {
  clientNumber?: string;
  isResetting?: any;
  setIsResetting?: any;
  form?: FormInstance;
};

const ClientSearch = (props:ClientSearchProps) => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]); // 选项
  const [clientInfosResult, setClientInfosResult] = useState<ClientInfo[]>([]);
  const [selectedClientNumber, setSelectedClientNumber] = useState<string>('');
  const [isRetail, setIsRetail] = useState<number>(1);
  const [validateStatus, setValidateStatus] = useState<FormItemProps['validateStatus']>('');  // 校验状态

  const clientNumber = props.clientNumber;  // 是否指定预先显示的客户编号
  const isResetting = props.isResetting;  // 重置状态，状态提升
  const setIsResetting = props.setIsResetting;
  const [clientNameToResetOnModifyingMode, setClientNameToResetOnModifyingMode] = useState<string>();  // 修改时显示的默认客户名称


  // 组件加载时判断是否需要预先显示商品
  useEffect(() => {
    // console.log(clientNumber);
    if(clientNumber){  // 需要预先显示商品
      reset();
    }
    if(isResetting){  // 处理重置时，目前重置时该effect生效2次，虽有重复但影响不大
      setIsResetting(false);
    }
  },[clientNumber, isResetting]);

  // selectedClientNumber变化时，更新表单中clientNumber的隐藏项
  useEffect(() => {
    props.form?.setFieldsValue({
      clientNumber: isRetail ? '0' : selectedClientNumber
    });
  }, [selectedClientNumber, isRetail]);

  // 重置
  const reset = () => {
    if(clientNumber){  // 需要预先显示商品
      if(clientNumber === '0'){   // 零售
        setIsRetail(1);
      }
      else {  // 有客户
        setIsRetail(0);
        // 设置显示客户名称和客户编号
        // let name = getClientNameByNumber(clientNumber);
        if(!clientNameToResetOnModifyingMode){  // 首次获取时
          const api_getClientByNumber = getClientByNumber(clientNumber);
          api_getClientByNumber.then(response => {
            let name = response.data.clientsName;
            props.form?.setFieldsValue({clientName: name});
            setSelectedClientNumber(clientNumber);
            setClientNameToResetOnModifyingMode(name);  // 首次获取之后进行记录，避免重置时重复获取
            setValidateStatus('success');   // 设置表单校验状态
          })
        }
        else{
          props.form?.setFieldsValue({clientName: clientNameToResetOnModifyingMode});
          setSelectedClientNumber(clientNumber);
          setValidateStatus('success');   // 设置表单校验状态
        }
      }
    }
    else{
      setSelectedClientNumber('');
      setValidateStatus(undefined);
    }
  };

  // // 通过clientNumber获取客户
  // const getClientNameByNumber = (clientNumber: string) => {
  //   let result: string;
  //   result = '南京海关';
  //   return result;
  // }

  // // 搜索客户
  // const searchClients = (query: string) => {
  //   let result = [
  //     new ClientInfo('TFS2010-001', '江苏省网球协会')
  //   ];
  //   setClientInfosResult(result);
  //   return result;
  // };

  // 展示搜索结果
  const searchResult = (query: string) => {
    // const result = searchClients(query);

    // 调用接口搜索
    const api_getClients = getClients({clientsName: query, num: 10});
    api_getClients.then(response => {
      let clientsList = response.data.clientsList;
      setClientInfosResult(clientsList.map((item: any) => {
        return {
          number: item.clientsNumber,
          name: item.clientsName
        };
      }));
      const results = clientsList.map((item: ClientInfo) => {
        return {
          key: item.number,
          value: item.name,    // 使用json格式一起记录编号
          label: (
            <Row>
              <Col xs={24} sm={14}>
                {item.name}
              </Col>
              <Col xs={24} sm={10}>
                {item.number}
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
    if(value) {
      searchResult(value);
    }
    else{
      setOptions([]);
      setValidateStatus('error');
    }
  };

  // 处理选择
  const onSelect = (value: string, option: any) => {
    console.log('onSelect', value);
    setSelectedClientNumber(option.key);
    setValidateStatus('success');   // 设置表单校验状态
  };

  const getAndShowClientInfo = () => {
    if(validateStatus === 'success'){   // 已经选择
      // 返回渲染
      return (
        <Row>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>客户编号:</b> </Col>
              <Col>{selectedClientNumber}</Col>
            </Row>
          </Col>
        </Row>
      )
    }
    else {
      return (
        <div style={{textAlign: 'center'}}>
          请输入并选择一个客户
        </div>
      )
    }
  }

  return (
    <Form.Item
      label={"客户"}
    >
      <Input.Group>
        <Select value={isRetail} onSelect={value => setIsRetail(value)} style={{width: '30%'}}>
          <Option value={1}>零售</Option>
          <Option value={0}>批发/团购</Option>
        </Select>
        {
          isRetail ? '' :
            <span>
              <Form.Item
                name={"clientName"}
                hasFeedback
                validateStatus={validateStatus}
                rules={[
                  {
                    required: true,
                    message: '请输入客户',
                  }
                  ]}
                noStyle
              >
                <AutoComplete
                  options={options}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                  backfill
                  style={{width: '70%'}}
                >
                  <Input.Search size={FormInputSize} placeholder="输入客户名称搜索"/>
                </AutoComplete>
              </Form.Item>
              <Form.Item name={'clientNumber'} noStyle style={{display: 'none'}}>
                <Input hidden/>
              </Form.Item>
            </span>
        }
        {
          isRetail ? '' :
            <Card style={{marginTop: '1rem', height: '4rem'}}>
              {getAndShowClientInfo()}
            </Card>
        }
      </Input.Group>
    </Form.Item>
  );
};

export default ClientSearch;