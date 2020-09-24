import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {isMobile} from '~utils'

import {changeBodyAttribute, manageBodyClass} from './helpers'

const initialState = {
  layoutWidth: 'fluid',
  leftSideBarTheme: 'dark',
  leftSideBarType: 'default',
  topbarTheme: 'light',
  isPreloader: false,
  showSidebar: true,
  leftMenu: false,
}

const layoutsSlice = createSlice({
  name: 'layouts',
  initialState,
  reducers: {
    changePreloader(state, {payload}) {
      state.isPreloader = payload
    },
    changeLayoutWidth(state, {payload: width}) {
      state.layoutWidth = width
    },
    changeSidebarTheme(state, {payload: theme}) {
      changeBodyAttribute('data-sidebar', theme)
      state.leftSideBarTheme = theme
    },
    changeSidebarType(state, {payload: sidebarType}) {
      switch (sidebarType) {
        case 'compact':
          changeBodyAttribute('data-sidebar-size', 'small')
          manageBodyClass('sidebar-enable', 'remove')
          manageBodyClass('vertical-collpsed', 'remove')
          break
        case 'icon':
          changeBodyAttribute('data-keep-enlarged', 'true')
          manageBodyClass('vertical-collpsed', 'add')
          break
        case 'condensed':
          manageBodyClass('sidebar-enable', 'add')
          if (!isMobile()) manageBodyClass('vertical-collpsed', 'add')
          break
        default:
          changeBodyAttribute('data-sidebar-size', '')
          manageBodyClass('sidebar-enable', 'remove')
          if (!isMobile()) manageBodyClass('vertical-collpsed', 'remove')
          break
      }

      state.leftSideBarType = sidebarType
    },
    changeTopbarTheme(state, {payload: theme}) {
      changeBodyAttribute('data-topbar', theme)
      state.topbarTheme = theme
    },
    showSidebar(state, {payload}) {
      state.showSidebar = payload
    },
    toggleLeftMenu(state, {payload}) {
      state.leftMenu = payload
    },
  },
})

export const changeLayoutWidth = createAsyncThunk(
  'layouts/changeLayoutWidth',
  async (width, {dispatch}) => {
    if (width === 'boxed') {
      dispatch(layoutsSlice.actions.changeSidebarType('icon'))
    } else {
      dispatch(layoutsSlice.actions.changeSidebarType('default'))
    }
    changeBodyAttribute('data-layout-size', width)

    dispatch(layoutsSlice.actions.changeLayoutWidth(width))
  }
)

export default layoutsSlice
