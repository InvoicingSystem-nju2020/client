import React, {useState} from "react";
import {SelectProps} from "antd/es/select";
import {FormItemProps} from "antd/es/form";
import {AutoComplete, Card, Col, Form, Input, Row, Select} from "antd";
import {FormInputSize} from "../../util/ComponentsUtil";


const { Option } = Select;

class ClientInfo{
  number: string;
  name: string;

  constructor(number: string, name: string) {
    this.number = number;
    this.name = name;
  }
}

const ClientSearch: React.FC = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]); // 选项
  const [clientInfosResult, setClientInfosResult] = useState<ClientInfo[]>([]);
  const [selectedClientNumber, setSelectedClientNumber] = useState<string>('');
  const [isRetail, setIsRetail] = useState<number>(1);
  const [validateStatus, setValidateStatus] = useState<FormItemProps['validateStatus']>('');  // 校验状态

  // 展示搜索结果
  const searchResult = (query: string) => {
    const result = [
      new ClientInfo('TFS2010-001', '江苏省网球协会')
    ];
    setClientInfosResult(result);
    return result.map((item, index) => {
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
                  <Input.Search size={FormInputSize} placeholder="输入供应商编号搜索"
                  />
                </AutoComplete>
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