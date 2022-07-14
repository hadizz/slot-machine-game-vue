import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import Cell from '../Cell.vue'
import {CHERRY, LEMON, ORANGE, WATERMELON, X} from "../../constants";

describe('Icons', () => {
    it('renders properly X', () => {
        const wrapper = mount(Cell, {props: {letter: X, spinning: false}})
        expect(wrapper.text()).toContain('?')
    })
    it('renders properly X spinning', () => {
        const wrapper = mount(Cell, {props: {letter: X, spinning: true}})
        expect(wrapper.classes()).toContain('spinning')
    })
    it('renders properly cherry', () => {
        const wrapper = mount(Cell, {props: {letter: CHERRY, spinning: false}})
        expect(wrapper.element.id).toBe('cherry')
    })
    it('renders properly lemon', () => {
        const wrapper = mount(Cell, {props: {letter: LEMON, spinning: false}})
        expect(wrapper.element.id).toBe('lemon')
    })
    it('renders properly orange', () => {
        const wrapper = mount(Cell, {props: {letter: ORANGE, spinning: false}})
        expect(wrapper.element.id).toBe('orange')
    })
    it('renders properly watermelon', () => {
        const wrapper = mount(Cell, {props: {letter: WATERMELON, spinning: false}})
        expect(wrapper.element.id).toBe('watermelon')
    })
    it('renders properly watermelon spinning', () => {
        const wrapper = mount(Cell, {props: {letter: WATERMELON, spinning: true}})
        expect(wrapper.element.id).toBe('watermelon')
        expect(wrapper.classes()).toContain('spinning')
    })
})
