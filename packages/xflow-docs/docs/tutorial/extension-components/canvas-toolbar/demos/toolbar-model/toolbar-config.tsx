import type { IModelService, IToolbarItemOptions } from '@wow/tflow'
import { createToolbarConfig } from '@wow/tflow'
import { MODELS, XFlowNodeCommands, IconStore } from '@wow/tflow'
import { SaveOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'

export namespace NSToolbarConfig {
  /** 注册icon 类型 */
  IconStore.set('PlusCircleOutlined', PlusCircleOutlined)
  IconStore.set('DeleteOutlined', DeleteOutlined)
  IconStore.set('SaveOutlined', SaveOutlined)

  /** toolbar依赖的状态 */
  export interface IState {
    isNodeSelected: boolean
  }

  /** 获取toolbar依赖的状态 */
  export const getToolbarState = async (modelService: IModelService) => {
    // nodes
    const nodes = await MODELS.SELECTED_NODES.useValue(modelService)
    return {
      isNodeSelected: nodes.length > 0,
    } as IState
  }
  /** toolbar依赖的配置项 */
  export const getToolbarItems = async (state: IState) => {
    const toolbarGroup1: IToolbarItemOptions[] = []
    toolbarGroup1.push({
      id: XFlowNodeCommands.MOVE_NODE.id,
      text: '删除节点，只有Node选中时可用',
      iconName: 'DeleteOutlined',
      tooltip: '删除节点: 只在有node选中时Enable',
      isEnabled: state.isNodeSelected,
    })

    return [{ name: 'toolbar', items: toolbarGroup1 }]
  }
}

/** toolbar依赖的配置项 */
export const useToolbarConfig = createToolbarConfig(toolbarConfig => {
  /** 生产 toolbar item */
  toolbarConfig.setToolbarModelService(async (toolbarModel, modelService) => {
    // 更新toolbar model
    const updateToolbarState = async () => {
      const toolbarState = await NSToolbarConfig.getToolbarState(modelService)
      const toolbarItems = await NSToolbarConfig.getToolbarItems(toolbarState)
      toolbarModel.setValue(toolbar => {
        toolbar.mainGroups = toolbarItems
      })
    }

    // 监听对应的model
    const model = await MODELS.SELECTED_NODES.getModel(modelService)
    model.watch(() => {
      updateToolbarState()
    })
  })
})
