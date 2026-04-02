import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc'
const { ccclass, property } = _decorator
import Levels from '../../Levels'

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55


@ccclass('TileMapManager')
export class TileMapManager extends Component {
  async init() {
    const { mapInfo } = Levels[`level${1}`]
    const spriteFrames = await this.loadRes()
    console.log('%c spriteFrames', 'font-size:px; background:green;', spriteFrames)
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i]
      for (let j = 0; j < column.length; j++) {
        const item = column[j]

        if (item.src === null || item.type === null) continue

        const node = new Node()
        const sprite = node.addComponent(Sprite)
        const imgSrc = `tile (${item.src})`
        sprite.spriteFrame = spriteFrames.find(_spriteFrame => _spriteFrame.name === imgSrc) || spriteFrames[0]

        const tranform = node.addComponent(UITransform)
        tranform.setContentSize(TILE_WIDTH, TILE_HEIGHT)

        node.layer = 1 << Layers.nameToLayer('UI_2D')
        //cocos is using left-bottom as the origin, so we need to use negative y to move the tile up
        node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)


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
