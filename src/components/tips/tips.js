import * as React from "react";
import {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {observer} from 'mobx-react';
import tipsStore from "../../store/tipsStore";
import {computed} from 'mobx';
import {Title, Box, P, B, Li} from './styledTextComponents';
import userParametersStore from "../../store/userParametersStore";
import * as mc from "../../algorithm/muscles/muscles-collection";

export let start = {
  id: 'start3',
  count: 2,
  component: class Start extends Component {
    render() {
      return <View><Box>
        <Title>Hello there!</Title>
        <P>We know how complex the topics of training and nutrition are. Most people get overwhelmed by all the
          information in the internet. But the good news is that if we follow some <B>basic principles</B> we are going
          to
          see <B>results</B>.
          We extracted these principles from tens of <B>research</B> papers. Then incorporated them in
          algorithms that tailor your workout routines.</P>
        <P>We are trying to make the app as simple as possible. Asterius covers a lot for you by building your routines,
          helping you progress with the weights and the nutrition. Every routine is <B>personalized</B> by your physical
          <B> parameters</B>, workout <B>frequency, duration</B> and even aesthetic <B>goals</B>.</P>
      </Box>
        <Box>
          <Title>It is important to know why!</Title>
          <P>Unfortunately, the <B>fitness industry</B> had become an easy <B>tool</B> for generating money by <B>lies
            and
            scams</B>. A lot of
            “gurus” and “fitness models” make tons of money by exploiting the insecurities and the <B>feelings</B> of
            the
            people.
            That’s how a lot of us can end up <B>spending our money</B> only to become even more confused.</P>

          <P>
            One of the <B>main purposes</B> of Asterius is to <B>teach you</B>. We will explain to you the basic <B>training
            concepts</B> and
            the biological principles behind it. <B>Do not worry!</B> It is not rocket science. On <B>every
            screen</B> of
            the app you
            will see the <B>helper circle</B>. You can move it around. <B>Press it to learn</B> more about the current
            things on the screen and
            the science behind them. At the bottom you can check the scientific <B>references</B>.
          </P>
          <P><B>Lets get started!</B></P>
        </Box>
      </View>
    }
  }
};

export let slide0 = {
  id: 'slide0',
  count: 2,
  component: class Slide0 extends Component {
    render() {
      return <View>
        <Box>
          <Title>Sex differences</Title>
          <P><B>Testosterone</B> is the main muscle building (anabolic) hormone in the human body. Males have as much
            as <B>15
              times</B> the testosterone of women. Males also have approximately <B>twice</B> as much muscle as females.</P>
          <P>This means that males will generally be <B>bigger</B> than females. But both sexes are equally prone to
            muscle
            growth. The main workout principles apply both males and females.</P>
        </Box>
        <Box>
          <Title>Reference</Title>
          <Li>Gender differences in strength and muscle fiber characteristics
            Miller, A.E.J., MacDougall, J.D., Tarnopolsky, M.A. et al. Europ. J. Appl. Physiol. (1993) 66: 254.
          </Li>
        </Box>
      </View>
    }
  }
};


export let slide1 = {
  id: 'slide1',
  count: 1,
  component: class Slide1 extends Component {
    render() {
      return <View>
        <Box>
          <Title>Your measurements</Title>
          <P>USA and UK have different measuring systems, called <B>Imperial</B>. It uses <B>inches</B> (in)
            and <B>pounds</B> (lbs) to
            measure height and weight. Most other parts of the world use <B>Metric</B> system
            with <B>centimeters</B> (cm) and
            <B>kilograms</B> (kg). Select your measuring units and Asterius will cover the rest.
          </P>
          <P>Your body measurements are especially important for your food and nutrition. They are also a very rough
            estimation for the body composition and the <B>fat index</B>. When you create your account you will be
            presented with the <B>nutrition</B> screen.</P>
        </Box>
      </View>
    }
  }
};

export let slide2 = {
  id: 'slide2',
  count: 1,
  component: class Slide2 extends Component {
    render() {
      return <View>
        <Box>
          <Title>Your experience</Title>
          <P>As we train, we grow stronger. In order to progress we need to lift heavier, and <B>progress
            steadily</B> in our
            <B>reps and sets</B> count. People with more fitness experience need to do <B>more work</B> to make
            progress.</P>
          <P>Luckily, <B>beginners</B> progress a <B>lot faster</B>. This is important for the motivation and
            the <B>confidence</B>. There is
            nothing better than seeing your body evolve every week.</P>
        </Box>
      </View>
    }
  }
};

export let slide3 = {
  id: 'slide3',
  count: 2,
  component: class Slide3 extends Component {
    render() {
      return <View>
        <Box>
          <Title>Workout frequency and duration</Title>
          <P>After workout our bodies have <B>increased synthesis of proteins</B> that heals and increases the size of
            our muscles. This process lasts roughly between <B>36 and 48 hours</B>.</P>
          <P>Research shows that splitting the workout volume gives better results. Asterius does that based on your
            workout frequency. That’s why if you once or twice per week you get one workout and if you train five or six
            times you will have three different workouts. This way you will be able to train every group <B>at least
              twice per week</B>, which is better than once. It is best to rotate between your workouts every
            time you hit the gym.</P>
          <P>If we train <B>more often</B> or for <B>longer duration</B>, we will be able to do more overall <B>training
            sets</B>. The amount
            of training sets we do is called <B>training volume.</B> The volume is the <B>MOST IMPORTANT FACTOR</B> for
            muscle growth.
            We will tell you more about it <B>later</B>. But for now, know that the <B>more overall time</B> you are
            able to spend in
            the gym, the <B>more results</B> you will get.</P>
        </Box>
        <Box>
          <Title>Reference</Title>
          <Li>MacDougall JD, Gibala MJ, Tarnopolsky MA, MacDonald JR, Interisano SA,
            Yarasheski KE. The time course for elevated muscle protein synthesis following
            heavy resistance exercise. Can J Appl Physiol. 1995 Dec</Li>
          <Li>Schoenfeld BJ, Ogborn D, Krieger JW. Effects of Resistance Training Frequency
            on Measures of Muscle Hypertrophy: A Systematic Review and Meta-Analysis. Sports
            Med. 2016 Nov</Li>
        </Box>
      </View>
    }
  }
};

export let slide4 = {
  id: 'slide4',
  count: 2,
  component: class Slide4 extends Component {
    render() {
      return <View>
        <Box>
          <Title>Isolation exercises</Title>
          <P>There are many exercises that we can do to develop our bodies. But we all have different <B>body
            compositions</B>
            and <B>aesthetic preferences</B>. Some of us naturally have bigger arms, others – bigger backs. There
            are <B>more than
              20 different muscle groups</B> that we can target.
          </P>
          <P><B>Isolation exercises</B> are these exercises that target
            <B> specific muscle groups</B> or parts of muscles. By pressing on the human model, you can select which are
            your most
            important muscles to train. When Asterius generates your routine, it will incorporate these isolation
            exercise.</P>
        </Box>
        <Box>
          <Title><Text style={{color: '#e74c3c'}}>Be wise!</Text></Title>
          <P>If you are man you probably want biceps, triceps, chest, back, abs, legs, <B>EVERTYTHING</B>! If you are
            woman,
            you may want glutes, legs, abs, chest and so on… But as you can imagine there is <B>no point</B> in
            performing <B>ONLY
              isolation exercises</B>. It will be very time <B>consuming and not efficient</B>. </P>
          <P>So, choose wisely only the <B>MOST IMPORTANT muscles</B> you want to specifically isolate. </P>
          <Li>If you train 1-2 times per week, go for 1 or 2 selected muscles</Li>
          <Li>If you train 3-4 times per week, you can pick 3 or 4</Li>
          <Li>If you train 5-6 times per week, choose 5 or 6</Li>
          <P><B>And don’t worry!</B> You will train everything. Your routine will be <B>balanced and science-based</B>.</P>
        </Box>
      </View>
    }
  }
};


export let slide5 = {
  id: 'slide5',
  count: 3,
  component: class Slide5 extends Component {
    @computed get experience() {
      switch (userParametersStore.parameters.experience) {
        case 1:
          return 'not yet';
        case 2:
          return 'slightly';
        case 3:
          return 'well';
        case 4:
          return 'very well'
      }
    }

    @computed get gender() {
      if (userParametersStore.parameters.gender === 1) {
        return 'male';
      } else {
        return 'female';
      }
    }

    @computed get measures() {
      if (userParametersStore.parameters.measuringUnit === 1) {
        return ['cm', 'kg'];
      } else {
        return ['in', 'lbs'];
      }
    }

    @computed get frequency() {
      if (userParametersStore.parameters.days === 1) {
        return 'one or two';
      } else if (userParametersStore.parameters.days === 2) {
        return 'two or three';
      } else {
        return 'five or six';
      }
    }

    @computed get muscles() {
      if (!userParametersStore.parameters.preferredMuscles) {
        return 'every muscle with the same rate';
      }
      return userParametersStore.parameters.preferredMuscles.map((id) => mc.get(id).info.broName).join(', ');
    }

    @computed get routine() {
      if (userParametersStore.parameters.days === 1) {
        return 'Your workout is full-body based. It is going to be pretty effective.';
      } else if (userParametersStore.parameters.days === 2) {
        return 'Your first workout is targeting the upper part of your body. The second workout is for the lower body and your core muscles.';
      } else {
        return 'Asterius has generated 3 workouts for you – push, pull, legs. In the first, you train your chest, triceps and shoulders. In the second – back and biceps. And the third workout focuses on your legs and core.';
      }
    }


    @observer
    render() {
      return <View>
        <Box>
          <Title>Insights</Title>
          <P>You are <B>{this.experience}</B> trained <B>{this.gender}</B>.
            Being <B>{userParametersStore.parameters.age}</B> years
            old, <B>{userParametersStore.parameters.height}</B> {this.measures[0]} tall,
            weighing <B>{userParametersStore.parameters.weight}</B> {this.measures[1]}.</P>
          <P>You want to focus on <B>{this.muscles}</B>.</P>
          <P>Your are going to work out <B>{this.frequency}</B> times per week
            for <B>{userParametersStore.parameters.duration}</B> minutes.</P>
        </Box>
        <Box>
          <Title>Your routine</Title>
          <P>Asterius has
            prepared <B>{userParametersStore.parameters.days} workout{userParametersStore.parameters.days === 1 ? '' : 's'}</B> for
            you. That way, based on your
            workout frequency, you will be able to hit every muscle group <B>twice per week</B>.</P>
          <P>{this.routine}</P>
        </Box>
        <Box>
          <Title>Tweak your routine</Title>
          <P>The <B>goal</B> of this project is to be as <B>simple</B> and as <B>effective</B> as possible. There are
            hundreds of exercises
            out there. Asterius provides the <B>most effective</B> ones that are proven to give results. Less than 50
            exercises
            are added in the database. But each one of them is very specific. By sticking to the basics, we are able to
            focus on our form and progress. </P>
          <P>You can <B>edit your workouts by pressing</B> on them. You can adjust your working volume for every muscle.
            You
            can easily and reorder the exercises in the workouts.</P>
        </Box>
      </View>
    }
  }
};

export let name = {
  id: '',
  count: 0,
  component: class NAME extends Component {
    render() {
      return <View>
        <Box>
          <Title></Title>
          <P></P>
        </Box>
      </View>
    }
  }
};