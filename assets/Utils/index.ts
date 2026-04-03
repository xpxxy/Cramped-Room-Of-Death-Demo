import { Layers, Node, UITransform } from 'cc'

export const createUINode = (name: string = '') => {
  const node = new Node(name)
  const tranform = node.addComponent(UITransform)
  tranform.setAnchorPoint(0, 1)
  node.layer = 1 << Layers.nameToLayer('UI_2D')
  return node
}