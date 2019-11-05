// 过滤特殊字符指令
export let filterSpecialChar = {
  update(el, binding, vnode) {
    let element = el.children[0];
    try {
      if (!element || binding.value === '') {
        return false;
      }
      element.value = binding.value.replace(/[^a-zA-Z0-9\u4E00-\u9FA5\_\(\)（）]/g, '');
      element.dispatchEvent(new Event(binding.modifiers.lazy ? 'change' : 'input'))
    } catch (e) {
      console.log(e);
    }
  }
}
