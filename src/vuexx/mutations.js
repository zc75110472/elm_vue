export default {
  vxaddCart (state, val) {
    state.vxfood.push(val)
  },
  vxdecreaseCart (state, value) {
    state.vxfood.forEach((val, index) => {
      if (val.name === value.name) {
        state.vxfood.splice(index, 1)
      }
    })
  }
}
