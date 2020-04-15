import { shallowMount } from '@vue/test-utils'
import Return from '@/components/Return.vue'

describe('Return.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Return, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
