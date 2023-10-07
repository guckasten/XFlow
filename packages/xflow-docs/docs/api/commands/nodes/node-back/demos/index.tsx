import React from 'react'
import type { IAppLoad, NsNodeCmd } from '@jiangzhongxi0322/tflow'
import { XFlow, createGraphConfig, XFlowCanvas, XFlowNodeCommands } from '@jiangzhongxi0322/tflow'
import { FormPanel } from './form'
import './index.less'

export const width = 100
export const height = 40

/**  graphConfig hook  */
export const useGraphConfig = createGraphConfig(graphConfig => {
  graphConfig.setX6Config({ grid: true })
  graphConfig.setDefaultNodeRender(props => {
    return <div className="react-node"> {props.data.label} </div>
  })
})

const NodeAddDemo: React.FC<{}> = () => {
  const graphConfig = useGraphConfig()
  const onLoad: IAppLoad = async app => {
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node1',
        x: 100,
        y: 30,
        label: 'NODENODE1',
        width,
        height,
      },
    })
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node2',
        x: 120,
        y: 50,
        label: 'NODENODE2',
        width,
        height,
      },
    })
    return app
  }

  return (
    <XFlow meta={{ flowId: 'add-node-demo' }} onLoad={onLoad} className="xflow-workspace">
      <FormPanel />
      <XFlowCanvas
        className="app-main-content"
        config={graphConfig}
        position={{ top: 0, left: 230, right: 0, bottom: 0 }}
      />
    </XFlow>
  )
}

export default NodeAddDemo
