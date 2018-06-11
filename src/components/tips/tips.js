import * as React from "react";
import {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {observer} from 'mobx-react';
import tipsStore from "../../store/tipsStore";
import {reaction} from 'mobx';
import {Title, Box, P, B, Li} from './styledTextComponents';

export class Demo extends Component {
  render() {
    return <Box>
      <Title>Workout routine and frequency</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
      <P>Research shows that splitting the workout volume gives better results. Asterius does that based on your workout
        frequency. That’s why if you once or twice per week you get one workout and if you train five or six times you
        will have three different workouts. This way you will be able to train every group <B>at least twice per
          week</B>, which is better than once. Rotate between your generated workouts every time you hit the
        gym.</P>
    </Box>
  }
}

export class Demo2 extends Component {
  render() {
    return <View>
      <Box>
        <Title>asdsadsadsdasdsda</Title>
        <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
          muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
      </Box><Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box> <Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box><Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box> <Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box><Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box> <Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box><Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box> <Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box><Box>
      <Title>asdsadsadsdasdsda</Title>
      <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of our
        muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
    </Box>

    </View>
  }
}