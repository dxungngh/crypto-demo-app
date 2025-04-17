import React from 'react';
import { render } from '@testing-library/react-native';
import Avatar from '../Avatar';
import CustomColors from '@/components/foundations/CustomColors';

jest.mock('@/components/foundations/CustomText', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return {
        CustomTextHeadingSmall: ({ children, style }: any) => (
            <Text testID="avatar-text" style={style}>
                {children}
            </Text>
        ),
    };
});

describe('Avatar component', () => {
    it('renders the first letter of symbol in uppercase', () => {
        const { getByTestId } = render(<Avatar symbol="btc" />);
        const text = getByTestId('avatar-text');
        expect(text.props.children).toBe('B');
    });

    it('applies correct default size styles', () => {
        const { getByTestId } = render(<Avatar symbol="btc" />);
        const view = getByTestId('avatar-view');
        const flatStyle = Array.isArray(view.props.style)
            ? Object.assign({}, ...view.props.style)
            : view.props.style;

        expect(flatStyle.width).toBe(40);
        expect(flatStyle.height).toBe(40);
        expect(flatStyle.borderRadius).toBe(20);
        expect(flatStyle.marginRight).toBe(16);
    });

    it('applies correct custom size styles', () => {
        const { getByTestId } = render(<Avatar symbol="e" size={60} />);
        const view = getByTestId('avatar-view');
        const flatStyle = Array.isArray(view.props.style)
            ? Object.assign({}, ...view.props.style)
            : view.props.style;

        expect(flatStyle.width).toBe(60);
        expect(flatStyle.height).toBe(60);
        expect(flatStyle.borderRadius).toBe(30);
    });

    it('applies correct text color style', () => {
        const { getByTestId } = render(<Avatar symbol="x" />);
        const text = getByTestId('avatar-text');
        expect(text.props.style).toEqual(
            expect.objectContaining({ color: CustomColors.white })
        );
    });
});
