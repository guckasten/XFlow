import React from 'react'
import type { IAppLoad, NsNodeCmd } from '@jiangzhongxi0322/tflow'
import { XFlow, createGraphConfig, XFlowCanvas, XFlowNodeCommands } from '@jiangzhongxi0322/tflow'
import { FormPanel, width, height } from './form'
import './index.less'

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
    // 在appReadyCallback中可以通过app执行command
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node1',
        x: 100,
        y: 30,
        shape: 'rect',
        label: 'Hello World',
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
