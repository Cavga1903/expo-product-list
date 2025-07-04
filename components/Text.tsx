import { Text as RNText, TextProps } from 'react-native';

export default function Text(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: 'Labrada-Regular' }, props.style]}
    >
      {props.children}
    </RNText>
  );
} 