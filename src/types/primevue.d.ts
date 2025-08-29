/* eslint-disable @typescript-eslint/no-explicit-any */
// PrimeVue TypeScript declarations for global components
// This file provides type safety for globally registered PrimeVue components

import type { DefineComponent } from 'vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // Buttons
    PButton: DefineComponent<{
      label?: string
      icon?: string
      iconPos?: 'left' | 'right' | 'top' | 'bottom'
      badge?: string
      badgeClass?: string
      loading?: boolean
      loadingIcon?: string
      disabled?: boolean
      severity?:
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'help'
        | 'danger'
      raised?: boolean
      rounded?: boolean
      text?: boolean
      outlined?: boolean
      size?: 'small' | 'large'
      plain?: boolean
    }>

    // Cards
    PCard: DefineComponent<{
      header?: string
      subTitle?: string
    }>

    // Form Controls
    PInputText: DefineComponent<{
      modelValue?: string | number
      size?: 'small' | 'large'
      invalid?: boolean
      variant?: 'filled' | 'outlined'
    }>

    PPassword: DefineComponent<{
      modelValue?: string
      promptLabel?: string
      weakLabel?: string
      mediumLabel?: string
      strongLabel?: string
      mediumRegex?: string
      strongRegex?: string
      hideIcon?: string
      showIcon?: string
      feedback?: boolean
      appendTo?: string
      toggleMask?: boolean
      inputClass?: string
      inputStyle?: string
      panelClass?: string
      panelStyle?: string
      invalid?: boolean
    }>

    PDropdown: DefineComponent<{
      modelValue?: any
      options?: any[]
      optionLabel?: string | ((option: any) => string)
      optionValue?: string | ((option: any) => any)
      optionDisabled?: string | ((option: any) => boolean)
      optionGroupLabel?: string
      optionGroupChildren?: string
      scrollHeight?: string
      filter?: boolean
      filterPlaceholder?: string
      filterLocale?: string
      filterMatchMode?: string
      filterFields?: string[]
      editable?: boolean
      placeholder?: string
      disabled?: boolean
      dataKey?: string
      showClear?: boolean
      inputId?: string
      inputClass?: string
      inputStyle?: string
      inputProps?: object
      panelClass?: string
      panelStyle?: string
      panelProps?: object
      filterInputProps?: object
      clearIconProps?: object
      appendTo?: string
      loading?: boolean
      clearIcon?: string
      dropdownIcon?: string
      filterIcon?: string
      loadingIcon?: string
      resetFilterOnHide?: boolean
      virtualScrollerOptions?: object
      autoOptionFocus?: boolean
      autoFilterFocus?: boolean
      selectOnFocus?: boolean
      filterMessage?: string
      selectionMessage?: string
      emptySelectionMessage?: string
      emptyFilterMessage?: string
      emptyMessage?: string
      tabindex?: number
      invalid?: boolean
      variant?: 'filled' | 'outlined'
    }>

    PCalendar: DefineComponent<{
      modelValue?: Date | Date[]
      selectionMode?: 'single' | 'multiple' | 'range'
      dateFormat?: string
      inline?: boolean
      showOtherMonths?: boolean
      selectOtherMonths?: boolean
      showIcon?: boolean
      icon?: string
      previousIcon?: string
      nextIcon?: string
      incrementIcon?: string
      decrementIcon?: string
      numberOfMonths?: number
      responsiveOptions?: any[]
      view?: 'date' | 'month' | 'year'
      touchUI?: boolean
      monthNavigator?: boolean
      yearNavigator?: boolean
      yearRange?: string
      panelClass?: string
      panelStyle?: string
      disabled?: boolean
      readonly?: boolean
      placeholder?: string
      showTime?: boolean
      timeOnly?: boolean
      showSeconds?: boolean
      showMillisec?: boolean
      hourFormat?: '12' | '24'
      stepHour?: number
      stepMinute?: number
      stepSecond?: number
      showOnFocus?: boolean
      showWeek?: boolean
      manualInput?: boolean
      appendTo?: string
      inputId?: string
      inputClass?: string
      inputStyle?: string
      inputProps?: object
      panelProps?: object
      invalid?: boolean
      variant?: 'filled' | 'outlined'
    }>

    // Data Display
    PDataTable: DefineComponent<{
      value?: any[]
      dataKey?: string
      rows?: number
      first?: number
      totalRecords?: number
      paginator?: boolean
      paginatorPosition?: 'top' | 'bottom' | 'both'
      alwaysShowPaginator?: boolean
      paginatorTemplate?: string
      pageLinkSize?: number
      rowsPerPageOptions?: number[]
      currentPageReportTemplate?: string
      lazy?: boolean
      loading?: boolean
      loadingIcon?: string
      sortField?: string
      sortOrder?: number
      defaultSortOrder?: number
      multiSortMeta?: any[]
      sortMode?: 'single' | 'multiple'
      removableSort?: boolean
      filters?: object
      filterDisplay?: 'menu' | 'row'
      globalFilterFields?: string[]
      filterLocale?: string
      selection?: any | any[]
      selectionMode?: 'single' | 'multiple'
      compareSelectionBy?: 'equals' | 'deepEquals'
      metaKeySelection?: boolean
      contextMenu?: boolean
      contextMenuSelection?: any
      selectAll?: boolean
      rowHover?: boolean
      csvSeparator?: string
      exportFilename?: string
      exportFunction?: (options: any) => any
      resizableColumns?: boolean
      columnResizeMode?: 'fit' | 'expand'
      reorderableColumns?: boolean
      expandedRows?: any[]
      expandedRowIcon?: string
      collapsedRowIcon?: string
      rowGroupMode?: string
      groupRowsBy?: string | string[]
      expandableRowGroups?: boolean
      expandedRowGroups?: any[]
      stateStorage?: 'session' | 'local'
      stateKey?: string
      editMode?: 'cell' | 'row'
      editingRows?: any[]
      rowClass?: (data: any) => object
      rowStyle?: (data: any) => object
      scrollable?: boolean
      scrollDirection?: 'vertical' | 'horizontal' | 'both'
      scrollHeight?: string
      virtualScrollerOptions?: object
      frozenColumns?: any[]
      frozenValue?: any[]
      breakpoint?: string
      showGridlines?: boolean
      stripedRows?: boolean
      tableStyle?: object
      tableClass?: string
      tableProps?: object
      size?: 'small' | 'large'
    }>

    PColumn: DefineComponent<{
      columnKey?: string
      field?: string
      sortField?: string
      filterField?: string
      dataType?: string
      sortable?: boolean
      header?: string
      footer?: string
      style?: object
      class?: string
      headerStyle?: object
      headerClass?: string
      bodyStyle?: object
      bodyClass?: string
      footerStyle?: object
      footerClass?: string
      showFilterMenu?: boolean
      showFilterOperator?: boolean
      showClearButton?: boolean
      showApplyButton?: boolean
      showFilterMatchModes?: boolean
      showAddButton?: boolean
      filterMatchModeOptions?: any[]
      maxConstraints?: number
      excludeGlobalFilter?: boolean
      filterHeaderClass?: string
      filterHeaderStyle?: object
      filterMenuClass?: string
      filterMenuStyle?: object
      selectionMode?: 'single' | 'multiple'
      expander?: boolean
      colspan?: number
      rowspan?: number
      rowReorder?: boolean
      rowReorderIcon?: string
      reorderableColumn?: boolean
      rowEditor?: boolean
      frozen?: boolean
      alignFrozen?: 'left' | 'right'
      exportable?: boolean
      exportHeader?: string
      exportFooter?: string
      filterMatchMode?: string
      hidden?: boolean
    }>

    // Overlays
    PDialog: DefineComponent<{
      header?: string
      footer?: string
      visible?: boolean
      modal?: boolean
      contentStyle?: object
      contentClass?: string
      contentProps?: object
      rtl?: boolean
      closable?: boolean
      dismissableMask?: boolean
      closeOnEscape?: boolean
      showHeader?: boolean
      baseZIndex?: number
      autoZIndex?: boolean
      position?:
        | 'center'
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'topleft'
        | 'topright'
        | 'bottomleft'
        | 'bottomright'
      maximizable?: boolean
      breakpoints?: object
      draggable?: boolean
      resizable?: boolean
      minX?: number
      minY?: number
      keepInViewport?: boolean
      headerStyle?: object
      headerClass?: string
      headerProps?: object
      closeIcon?: string
      closeButtonProps?: object
      maximizeIcon?: string
      minimizeIcon?: string
      maximizeButtonProps?: object
      blockScroll?: boolean
      appendTo?: string
    }>

    PToast: DefineComponent<{
      group?: string
      position?:
        | 'top-right'
        | 'top-left'
        | 'bottom-left'
        | 'bottom-right'
        | 'top-center'
        | 'bottom-center'
        | 'center'
      autoZIndex?: boolean
      baseZIndex?: number
      breakpoints?: object
      closeIcon?: string
      infoIcon?: string
      warnIcon?: string
      errorIcon?: string
      successIcon?: string
      closeButtonProps?: object
    }>

    PConfirmDialog: DefineComponent<{
      group?: string
      breakpoints?: object
      draggable?: boolean
    }>

    // Progress
    PProgressSpinner: DefineComponent<{
      strokeWidth?: string
      fill?: string
      animationDuration?: string
      style?: object
      class?: string
    }>

    // Menu
    PMenu: DefineComponent<{
      model?: any[]
      popup?: boolean
      appendTo?: string
      baseZIndex?: number
      autoZIndex?: boolean
      exact?: boolean
      tabindex?: number
    }>

    PMenubar: DefineComponent<{
      model?: any[]
      exact?: boolean
      buttonProps?: object
      menuButtonIcon?: string
      breakpoint?: string
    }>

    // Misc
    PAvatar: DefineComponent<{
      label?: string
      icon?: string
      image?: string
      size?: 'normal' | 'large' | 'xlarge'
      shape?: 'square' | 'circle'
      style?: object
      class?: string
      imageAlt?: string
      imageError?: (event: Event) => void
    }>

    PBadge: DefineComponent<{
      value?: string | number
      severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger'
      size?: 'large' | 'xlarge'
      style?: object
      class?: string
    }>

    PChip: DefineComponent<{
      label?: string
      icon?: string
      image?: string
      removable?: boolean
      removeIcon?: string
      style?: object
      class?: string
      imageAlt?: string
    }>

    PTag: DefineComponent<{
      value?: string
      severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger'
      rounded?: boolean
      icon?: string
      style?: object
      class?: string
    }>

    PDivider: DefineComponent<{
      align?: 'left' | 'center' | 'right' | 'top' | 'center' | 'bottom'
      layout?: 'horizontal' | 'vertical'
      type?: 'solid' | 'dashed' | 'dotted'
      style?: object
      class?: string
    }>

    PImage: DefineComponent<{
      preview?: boolean
      class?: string
      style?: object
      imageClass?: string
      imageStyle?: object
      width?: string
      height?: string
      alt?: string
      indicatorIcon?: string
      zoomInDisabled?: boolean
      zoomOutDisabled?: boolean
      rotateLeftDisabled?: boolean
      rotateRightDisabled?: boolean
      closeDisabled?: boolean
      showTransformControls?: boolean
      rotateLeftIcon?: string
      rotateRightIcon?: string
      zoomInIcon?: string
      zoomOutIcon?: string
      closeIcon?: string
    }>
  }
}

export {}
