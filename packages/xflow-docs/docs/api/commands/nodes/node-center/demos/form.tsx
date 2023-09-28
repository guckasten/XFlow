import React from 'react'
import { Button, Card, Form, Input, message } from 'antd'
import type { IFormSchema } from '@wow/tflow'
import { useXFlowApp, WorkspacePanel, MODELS, useModelAsync, FormBuilder } from '@wow/tflow'
import type { NsNodeCmd } from '@wow/tflow'
import { XFlowNodeCommands } from '@wow/tflow'

export const width = 100
export const height = 40

interface IFormValues {
  id: string
  nodeConfig: string
}

const formItems: IFormSchema[] = [
  {
    name: 'id',
    label: 'id',
    rules: [{ required: true }],
    render: Input,
  },
  {
    name: 'nodeConfig',
    label: 'nodeConfig',
    rules: [{ required: true }],
    render: Input.TextArea,
    renderProps: { rows: 5 },
  },
]

export const CmdForm = () => {
  const app = useXFlowApp()
  const [form] = Form.useForm<IFormValues>()

  const [selectNode] = useModelAsync<MODELS.SELECTED_NODE.IState>({
    getModel: async () => MODELS.SELECTED_NODE.getModel(app.modelService),
    initialState: null,
  })

  React.useEffect(() => {
    if (selectNode) {
      const node = selectNode.getData()
      form.setFieldsValue({
        id: node.id,
        nodeConfig: JSON.stringify(node),
      })
    }
  }, [form, selectNode])

  const onFinish = async (values: IFormValues) => {
    app.commandService.executeCommand<NsNodeCmd.CenterNode.IArgs>(
      XFlowNodeCommands.CENTER_NODE.id,
      {
        nodeConfig: JSON.parse(values.nodeConfig),
      },
    )

    message.success(`${XFlowNodeCommands.CENTER_NODE.label}: 命令执行成功`)
  }

  return (
    <FormBuilder<IFormValues>
      form={form}
      formItems={formItems}
      onFinish={onFinish}
      initialValues={{
        id: null,
        nodeConfig: null,
      }}
      submitButton={
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={!selectNode}>
          选中节点执行命令
        </Button>
      }
    />
  )
}

export const FormPanel = () => {
  return (
    <WorkspacePanel position={{ top: 0, left: 0, bottom: 0, width: 230 }} className="panel">
      <Card title="NodeConfig Options" size="small" bordered={false}>
        <CmdForm />
      </Card>
    </WorkspacePanel>
  )
}
