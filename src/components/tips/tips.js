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
          <P>If you are man you probably want biceps, triceps, chest, back, abs, legs, and so on! If you are
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

export let login = {
  id: 'login',
  count: 1,
  component: class Login extends Component {
    render() {
      return <View>
        <Box>
          <Title>Login</Title>
          <P>Log into your account to synchronize your data.</P>
        </Box>
      </View>
    }
  }
};

export let register = {
  id: 'register',
  count: 1,
  component: class Register extends Component {
    render() {
      return <View>
        <Box>
          <Title>Register</Title>
          <P>By creating your account, you will be able to save and synchronize your data everywhere. Even if you
            reinstall the app or go offline, it will work just as before!</P>
        </Box>
      </View>
    }
  }
};


export let tweaker = {
  id: 'tweaker',
  count: 4,
  component: class Tweaker extends Component {
    render() {
      return <View>
        <Box>
          <Title>One complex machine</Title>
          <P>Our body is a complex machine. This machine can do <B>many tasks</B> like pushing, pulling and lifting. It
            is
            made of <B>many parts</B> that <B>work together in groups</B>. These parts are <B>our muscles</B>.</P>
          <P>Every exercise targets <B>different muscles at different rate</B>. If we bench press, we are using the
            muscles of
            our chest, shoulders and triceps. But if we want to <B>isolate</B> our triceps, we can do triceps pushdown.
            We can
            perform the bench press with <B>more weight</B> than the triceps pushdown, because the bench press
            activates <B>more
              muscles at once</B>.</P>
          <P>Let’s say that the triceps is doing <B>1/3 of the work</B> for the bench press. And the triceps does all
            the work
            for the triceps pushdown. That means, one set of well performed pushdowns is equal to the <B>work of 3
              sets</B> of
            bench presses for the triceps.</P>
        </Box>
        <Box>
          <Title>Workout volume</Title>
          <P>The <B>most important factor</B> that determines our muscle growth is the overall <B>workout volume</B>. It
            can be measured by the
            <B> amount of sets per muscle group</B>. But keep in mind that most exercises train <B>multiple muscles at
              once</B>.</P>
          <P>If we don’t do enough volume, our muscles won’t have enough stimulus to grow. But if we do too much sets,
            we will <B>overtrain</B> our muscles which will stop the progress and might even injure us. We need to <B>avoid
              injuries</B> at all cost, because they are the biggest setback.</P>
        </Box>
        <Box>
          <Title>The exercises</Title>
          <P>The <B>body model</B> shows all muscles that can be targeted with exercises. The <B>brighter</B> the
            muscle, the <B>more
              volume</B> it will get. If you <B>press on a muscle</B>, you will see all exercises that train it.</P>
          <P>You can see all the <B>major muscles</B> that the exercise targets. Every muscle is active at different
            rate for
            the different exercises.</P>
          <P>If you <B>press on the exercise name</B>, YouTube will be opened with the best <B>explanatory videos</B> on
            how to
            perform it.</P>
        </Box>
        <Box>
          <Title>Edit the volume</Title>
          <P>Keep in mind that <B>some muscles are bigger</B> than others and <B>need more volume</B>. If you see muscle
            getting <B>fully
              bright</B>, <B>do not</B> add more volume to it. Try <B>not to</B> make your workouts much <B>longer than
              hour and a half</B>.</P>
          <Li>You can use the <B>scrollbar</B> below every exercise to <B>edit the amount of sets</B>.</Li>
          <Li>If you want to <B>remove</B> particular exercise, make its sets 0.</Li>
          <Li>If you want to <B>reorder</B>, press on <B>view workout</B> and use the <B>arrows</B>.</Li>
        </Box>
      </View>
    }
  }
};

export let workoutsScreen = {
  id: 'workoutsScreen',
  count: 3,
  component: class WorkoutsScreenTips extends Component {
    render() {
      return <View>
        <Box>
          <Title>Log workouts</Title>
          <P>You can <B>select any date up to today</B> on the <B>calendar</B>. On the bottom you can see <B>all of your
            workouts</B>. If you press the
            <B> play button</B>, you will <B>start logging</B> that workout on the selected date. The first time you hit
            the gym log
            Workout A. Next time log Workout B and so on. Simply <B>cycle trough your routine</B>.</P>
          <P>If you press on the workout, you will open it for <B>editing</B>.</P>
        </Box>
        <Box>
          <Title>Generate new routine</Title>
          <P>By pressing the generate button you will be able to generate new routine, just like you did in the
            beginning. The new workouts will be added in the beginning of your workouts list.</P>
        </Box>
        <Box>
          <Title>Custom workouts</Title>
          <P>You can make your custom workout from scratch by pressing on the custom button.</P>
        </Box>
      </View>
    }
  }
};

export let weight = {
  id: 'weight',
  count: 3,
  component: class WeightTips extends Component {
    render() {
      return <View>
        <Box>
          <Title>Weight logging</Title>
          <P>Good way to track your progress is by tracking your weight. Asterius keeps your results and <B>regulates
            your
            nutrition</B> based on your weight.</P>
          <P>The graphic represents the <B>changes in your weight</B> for the <B>selected period</B> of time.</P>
          <P>For best results measure your weight <B>as often as possible</B>. One good approach is to:</P>
          <Li>Measure your weight in the morning after you had been to the toilet</Li>
          <Li>Measure your weight before going to bed</Li>
          <Li>Sometimes, if you are at home, you can weight yourself in the middle of the day</Li>
        </Box>
        <Box>
          <Title>Your weight is not constant</Title>
          <P>Some days we will be <B>lighter</B>, others – <B>heavier</B>. Our weight is <B>changing</B> even throughout
            the day. If we eat
            more or drink more water, we will be heavier. If we have been out partying, we will be <B>dehydrated</B> and
            lighter.</P>
          <P><B>Women</B> are even more prone to changes in weight due to their periods.</P>
          <P>Asterius estimates the <B>average value</B> of your weight for the week to <B>regulate the nutrition</B>.
            That’s why you
            need to try to measure your weight more <B>frequently</B>.</P>
        </Box>
        <Box>
          <Title>Reference</Title>
          <Li>Orsama AL, Mattila E, Ermes M, van Gils M, Wansink B, Korhonen I. Weight
            rhythms: weight increases during weekends and decreases during weekdays. Obes
            Facts. 2014
          </Li>
        </Box>
      </View>
    }
  }
};

export let nutrition = {
  id: 'nutrition',
  count: 4,
  component: class Nutrition extends Component {
    render() {
      return <View>
        <Box>
          <Title>Nutrition</Title>
          <P>What you eat is <B>essential</B> for accomplishing your fitness goals. Following a <B>strict and rigid diet
            is NOT
            needed</B>. It is a <B>myth</B> that some foods build muscles, other makes you lose fat and so on. Research
            shows that
            the most important factor is the <B>overall calories and macronutrients</B> (proteins, fats, carbohydrates).
            This
            approach is way more easier and less exhausting.</P>
        </Box>
        <Box>
          <Title>Calories</Title>
          <P>Our bodies need <B>energy</B> to survive. That energy comes from food in the form
            of <B>calories</B> (kCal). The calories
            needed to keep our body functions working and to maintain our weight is called <B>TDEE</B> (Total Daily
            Energy Expenditure).</P>
          <P>Asterius calculates your BMR (Basal Metabolic Rate) by using formula called The Mifflin St Jeor Equation.
            It uses your age, weight and height to estimate how much calories your body is burning at rest.</P>
          <P>But we are constantly doing something. Working out, walking, playing games and even staying up burns
            additional calories. That’s why the TDEE is calculated by using your BMR and your activity level
            (lifestyle). This is the number of calories you need to eat to keep your weight the same.</P>
          <P>Each one of us has different goals. Some people want to lose more fat, others want to build more muscle.
            Asterius gives you the option to <B>choose your goal</B>. Base on that your calories are either <B>increased
              for
              weight gain</B>, or <B>reduced for weight loss</B>.</P>

        </Box>
        <Box>
          <Title>Macronutrients</Title>
          <P><B>Protein is essential</B> for our bodies. It provides <B>building blocks of our muscles</B> – the amino
            acids. Research
            suggests that <B>1.8 gr of protein per kg body mass</B> is beneficial for our muscle gains. If we are in <B>caloric
              deficit</B> (eating less calories to lose weight), it would be better to <B>eat 2 or more gr of protein
              per kg body
              mass</B>.</P>
          <P><B>Fat is essential</B> for our <B>hormones and health</B>. Different sources suggests
            that <B>15-30%</B> of our calories
            must be consumed in the form of fats. Fats are very important for the work of the nervous system, that’s why
            Asterius estimates 30% of your calories in the form of fats.</P>
          <P><B>Carbohydrates are the main source of energy</B>. They can be useful for our <B>workouts performance</B>.
            But carbs are
            <B>not essential</B>. Humans <B>can live without</B> consuming any carbohydrates. After calculating the
            basic amounts of
            protein and fats, Asterius calculates the rest of the calories in the form of carbs.</P>
          <P>This is how many calories each one of the macronutrients provides:</P>
          <Li>1 gr protein = 4 kCal</Li>
          <Li>1 gr fat = 9 kCal</Li>
          <Li>1 gr carbs = 4 kCal</Li>
        </Box>
        <Box>
          <Title>Supplements</Title>
          <P>You have seen that everyone in the <B>fitness industry</B> is <B>trying to sell you supplements</B>. Have
            you ever
            wondered why? People <B>want to believe</B> that taking a <B>magical pill</B> will solve their problems.
            Well, that is <B>NOT
              the case</B>. There are no shortcuts. If we want something, it will come to us. But we need to work hard,
            smart
            and consistently for it. Most of the substances in most supplements are not proven to have any effects at
            all. It is simple <B>marketing</B>.</P>
          <P>Even though the results may not be magical, there are some supplements that <B>might be beneficial</B> for
            your
            results and your overall health. </P>
          <Li>Creatine - 5 gr per day is shown to improve overall strength.</Li>
          <Li>Omega 3 is form of essential fatty acids. Western diets do not provide enough omega 3. Supplementing with
            it is beneficial for the health, nervous system and can even help build muscle.</Li>
          <Li>Magnesium – this mineral is very important for our nervous system and recovery. Western diet might not be
            able to provide enough magnesium to our bodies. </Li>
          <Li>Caffeine – cup of coffee contains 80-100 mg of caffeine. If you don’t drink coffee you can buy caffeine
            capsules. 100-200 mg of caffeine before workout will increases energy, focus and endurance.</Li>
          <Li>Citrulline malate – 6-8 gr of this supplement half an hour before workout improves athletic performance.
            It increases the blood flow to the muscles, causing metabolic stress. This is also known as “muscle
            pump”.</Li>
          <Li>Vitamin D – we make vitamin D when we go out during the sunny days. But in the winter in some countries
            there is not enough sunlight. That’s why it may be beneficial to supplement vitamin D in the winter.</Li>
          <P>We recommend <B>researching these supplements yourself</B>. There are tons of great posts and articles
            about them
            on <B>Reddit, Quora and other sites</B>.</P>
        </Box>
        <Box>
          <Title>Our advice</Title>
          <P>Our nutrition is important not only for our fitness, but for the overall health and wellbeing. It is <B>vast
            and complex topic</B> that is highly <B>researched</B>. Asterius can calculate the needed macronutrients.
            But the food
            provides <B>micronutrients too – vitamins and minerals</B>. We highly recommend <B>eating whole foods and
              healthy
              foods</B> – vegetables, fruits, salads, meats, fish, eggs and dairy.</P>
          <P><B>Processed sugars, simple carbohydrates</B> (bread, pasta, cookies, juices, soda) and fast food are <B>bad
            for your
            body</B>. Try to avoid them as much as possible. We know that eating these foods is <B>very addictive</B>.
            This is
            because they raise the levels of dopamine in the brain just like some drugs do. But if we stick to better
            quality food for a while, our <B>body will adapt</B> to it and the <B>cravings will stop</B>.</P>
          <P><B>Every person is different</B> with different genes and metabolism. We cannot
            cover every aspect of the nutrition. But our experience has shown us that having <B>caloric and
              macronutrient guidance is
              very beneficial</B>. Combining it with <B>eating high quality whole foods and supplements can do
              wonders</B>!</P>
          <P>There are <B>many diets out there</B>. Ketogenic, paleo, vegan and others are examples. There are
            techniques for fat loss and appetite suppression like intermittent fasting. These are topics that we may
            cover in the future with new features of the Asterius app. For now, we recommend you do your own research
            and
            <B> try what works for you</B>. Fueling our bodies with <B>good food</B> is important for our physique,
            our brains and for being healthy and <B>awesome</B>!</P>
        </Box>
        <Box>
          <Title>Reference</Title>
          <Li>Stanhope KL. Sugar consumption, metabolic disease and obesity: The state of
            the controversy. Crit Rev Clin Lab Sci. 2016
          </Li>
          <Li>Phillips SM, Van Loon LJ. Dietary protein for athletes: from requirements to optimum adaptation. J Sports
            Sci. 2011</Li>
          <Li>Helms ER, Aragon AA, Fitschen PJ. Evidence-based recommendations for natural bodybuilding contest
            preparation: nutrition and supplementation. J Int Soc Sports Nutr. 2014 May 12</Li>
          <Li>Stewart TM, Williamson DA, White MA. Rigid vs. flexible dieting: association with eating disorder symptoms
            in nonobese women. Appetite. 2002 Feb
          </Li>
          <Li>Alshahrani F, Aljohani N. Vitamin D: deficiency, sufficiency and toxicity. Nutrients. 2013 Sep 13</Li>
          <Li>Pérez-Guisado J, Jakeman PM. Citrulline malate enhances athletic anaerobic
            performance and relieves muscle soreness. J Strength Cond Res. 2010
            May
          </Li>
          <Li> Bemben MG, Lamont HS. Creatine supplementation and exercise performance:
            recent findings. Sports Med. 2005
          </Li>
          <Li>Swanson D, Block R, Mousa SA. Omega-3 fatty acids EPA and DHA: health benefits
            throughout life. Adv Nutr. 2012 Jan
          </Li>
        </Box>
      </View>
    }
  }
};

export let workoutLog = {
  id: 'workoutLog',
  count: 6,
  component: class WorkoutLogTips extends Component {
    render() {
      return <View>
        <Box>
          <Title>Our muscles</Title>
          <P>Our muscles are made of <B>two fiber types.</B></P>
          <P><B>Type 2 or “Fast”</B> fibers are <B>stronger and bigger</B>. They generate <B>bigger power output in
            heavy lifts</B> but get
            <B>exhausted first</B>. That is why our first sets should be the heaviest.</P>
          <P><B>Type 1 or “Slow”</B> fibers are <B>ess powerful and smaller</B>l. These fibers generate <B>less power,
            but for longer
            periods</B>. They become more active when we lift lighter for more reps.</P>
          <P>Research shows that most muscle growth can be made around the <B>8-12 repetitions range</B>. Our first sets
            must
            be performed with the heaviest weight. In the 6-7-8 reps range. Then we can slowly reduce the weight and
            increase the weight for the next sets. This approach gives few benefits:</P>
          <P>When performing the <B>first sets of the exercise</B> our nervous system and type 2 fibers are not
            exhausted. We are able to lift <B>heavy weights</B>
            thus adopting our bodies to bigger loads and volume.</P>
          <P>After perform the heavy lifts, our fast fibers get exhausted and the work gets transferred to the slow
            fibers. By reducing the weight and increasing the reps in the following sets, we will be able to focus more
            on the
            <B>form of the exercise</B>. It is safer to <B>lift lighter weight when fatigued</B>. Also doing reps in the
            upper range (10-14 reps) increases the blood flow to the muscles and creates <B>“muscle pump”</B>.</P>
        </Box>
        <Box>
          <Title>Warm-up sets</Title>
          <P>
            If you perform hard compound exercise that involves a lot of muscles, you can do warm-up set. It
            will <B>prepare, stretch the muscles and focus you on the movement</B>. It is important to focus your
            attention on
            the <B>form</B> of the exercise and to <B>think about the muscles you train</B>. If you decide to do warm-up
            set, select
            <B>light weight and do 15-20 reps</B>. You <B>don’t have to log it</B>, because it is not crucial for main
            workout volume.
          </P>
        </Box>
        <Box>
          <Title>What reps and weight?</Title>
          <P><B>Stop your first sets at least one rep before failure!</B> Research shows that training to <B>failure is
            not
            necessary</B>. It can exhaust you and even injure you. By saving your energy, you will be able to do more
            work in
            the next sets and generate more overall volume.</P>
          <P>Let’s use the bench press for an <B>example</B>. Here it is one way of structuring the sets:</P>
          <Li>Set 1: 6 reps x 100 kg (220 lbs)</Li>
          <Li>Set 2: 8 reps x 90 kg (200 lbs)</Li>
          <Li>Set 3: 10 reps x 80 kg (176 lbs)</Li>
          <Li>Set 4: 13 reps x 73 kg (160 lbs) – the last set uses lighter weights and can be performed to failure</Li>
          <P>Of course, your values will not be the same. But the idea is to start with the heavier weight and lower
            reps.
            Then increase the sets and reduce the weight. Try to stay around the 8-12 reps range.</P>
        </Box>
        <Box>
          <Title>Logging and progressing</Title>
          <P>For every exercise in your workout you should <B>log the performed sets</B>. Every set will <B>appear on
            the graphic</B> as you log it.
            The <B>more weight you lift, the higher the box</B> of the set will appear. <B>The more reps you do, the
              bigger the
              box</B> will
            be. This is very easy and innovative way to track your progress. All performed sets will appear on the
            graphic. And you can press on it to open previous workouts where you had done this exercise.</P>
          <P>By performing resistance training <B>the muscles adapt to the intensity.</B> For progress to take place,
            the workout <B>intensity has to grow steadily</B>. Try to <B>increase the weight across all sets slowly</B>,
            workout
            after workout. You
            can also <B>increase the reps for particular set</B>. But keep in mind the <B>principles above</B>. Focus
            on <B>heavy weight
              in the first sets</B> and focus on <B>repetitions in the final ones</B>.</P>
          <P>The process of lifting heavier weights every workout is called <B>progressive overload</B>.</P>
        </Box>
        <Box>
          <Title>Rest intervals</Title>
          <P>
            Research has not yet found a clear winner between smaller and bigger rest interval Since the most <B>important
            factors are the overall workout volume and the progressive overload</B>, we recommend <B>resting as much as
            it is
            needed</B>. If you don’t rest enough, you might not be able to perform the needed reps for progress. And if
            you
            rest too much, you are just wasting your time. So <B>just rest until you recover your breath and feel ready
            to
            perform</B> the next set. Try to lift more every workout and don’t worry about the rest.
          </P>
        </Box>
        <Box>
          <Title>Reference</Title>
          <Li>Nóbrega SR, Libardi CA. Is Resistance Training to Muscular Failure Necessary? Frontiers in Physiology.
            2016</Li>
          <Li>BJ, Ratamess NA, Peterson MD, Contreras B, Sonmez GT, Alvar BA.
            Effects of different volume-equated resistance training loading strategies on muscular adaptations in
            well-trained men. J Strength Cond Res. 2014 Oct
          </Li>
          <Li> Wilson JM, Loenneke JP, Jo E, Wilson GJ, Zourdos MC, Kim JS. The effects of
            endurance, strength, and power training on muscle fiber type shifting. J Strength
            Cond Res. 2012 Jun
          </Li>
          <Li>Calatayud J, Vinstrup J, Jakobsen MD, Sundstrup E, Brandt M, Jay K, Colado JC,
            Andersen LL. Importance of mind-muscle connection during progressive resistance
            training. Eur J Appl Physiol. 2016 Mar
          </Li>
          <Li>De Freitas MC, Gerosa-Neto J, Zanchi NE, Lira FS, Rossi FE. Role of metabolic stress for enhancing muscle
            adaptations: Practical applications. World Journal of Methodology. 2017</Li>
          <Li>Mangine GT, Hoffman JR, Gonzalez AM, et al. The effect of training volume and intensity on improvements in
            muscular strength and size in resistance-trained men. Physiological Reports. 2015</Li>
        </Box>
      </View>
    }
  }
};

export let settings = {
  id: 'settings',
  count: 1,
  component: class Settings extends Component {
    render() {
      return <View>
        <Box>
          <Title>Contact us</Title>
          <P>Fitness is complex but amazing sport. It will help you develop your body, mind and confidence. You probably
            have a lot of questions. You can <B>ask us anything</B>. We will be glad to help you and we will consider
            your
            <B> features request</B> for the <B>future versions of Asterius</B>.</P>
          <P><B>Let’s make the fitness industry better together!</B></P>
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