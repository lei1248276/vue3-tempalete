import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { Route } from '@/router'

export type TagView = Partial<RouteLocationNormalizedLoaded> & {
  title?: string
  meta?: Partial<Route['meta']>
}

export type VisitedViews = TagView[]
export type CachedViews = string[]
export interface TagsViewsState {
  visitedViews: TagView[],
  cachedViews: string[]
}

export const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: [] as TagView[],
    cachedViews: [] as string[]
  }),
  actions: {
    addView(view: TagView) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view: TagView) {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view?.meta?.title || 'no-name'
        })
      )
    },
    addCachedView(view: TagView) {
      if (this.cachedViews.includes(String(view.name))) return
      if (!view?.meta?.noCache) {
        this.cachedViews.push(String(view.name))
      }
    },

    delView(view: TagView): Promise<TagsViewsState> {
      return new Promise(resolve => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delVisitedView(view: TagView): Promise<VisitedViews> {
      return new Promise(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view: TagView): Promise<CachedViews> {
      return new Promise(resolve => {
        const index = this.cachedViews.indexOf(String(view.name))
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },

    delOthersViews(view: TagView): Promise<TagsViewsState> {
      return new Promise(resolve => {
        this.delOthersVisitedViews(view)
        this.delOthersCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersVisitedViews(view: TagView): Promise<VisitedViews> {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(v => {
          return v?.meta?.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view: TagView): Promise<CachedViews> {
      return new Promise(resolve => {
        const index = this.cachedViews.indexOf(String(view.name))
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },

    delAllViews(): Promise<TagsViewsState> {
      return new Promise(resolve => {
        this.delAllVisitedViews()
        this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllVisitedViews() {
      return new Promise(resolve => {
      // keep affix tags
        const affixTags = this.visitedViews.filter((tag) => tag?.meta?.affix)
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise(resolve => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },

    updateVisitedView(view: TagView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})
