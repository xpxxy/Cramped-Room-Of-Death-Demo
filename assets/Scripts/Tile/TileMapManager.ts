import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc'
const { ccclass, property } = _decorator
import Levels from '../../Levels'
import { TileManager } from './TileManager'
import { createUINode } from '../../Utils'

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileMapManager')
export class TileMapManager extends Component {
  async init() {
    const { mapInfo } = Levels[`level${1}`]
    const spriteFrames = await this.loadRes()
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i]
      for (let j = 0; j < column.length; j++) {
        const item = column[j]

        if (item.src === null || item.type === null) continue

        const node = createUINode()
        const imgSrc = `tile (${item.src})`
        const spriteFrame = spriteFrames.find(_spriteFrame => _spriteFrame.name === imgSrc) || spriteFrames[0]

        const tileManager = node.addComponent(TileManager)
        tileManager.init(spriteFrame, i, j)

        node.setParent(this.node)
      }
    }
  }

  loadRes() {
    return new Promise<SpriteFrame[]>((resolve, reject) => {
      resources.loadDir('texture/tile/tile', SpriteFrame, (err, assets) => {
        if (err) {
          reject(err)
          return []
        }
        resolve(assets)
      })
    })
  }
}