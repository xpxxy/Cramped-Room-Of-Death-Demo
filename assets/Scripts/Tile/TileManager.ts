import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc'
const { ccclass, property } = _decorator
import Levels from '../../Levels'

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileMapManager')
export class TileManager extends Component {
  async init(spriteFrame: SpriteFrame, i: number, j: number) {
    const sprite = this.addComponent(Sprite)
    sprite.spriteFrame = spriteFrame

    const tranform = this.getComponent(UITransform)
    tranform.setContentSize(TILE_WIDTH, TILE_HEIGHT)

    this.node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)
  }
}