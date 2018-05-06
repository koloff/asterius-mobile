import {View, TouchableOpacity, Text, Linking, WebView} from 'react-native';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import {withNavigation} from "react-navigation";
import {gs} from "../../globals";

@withNavigation
export default class Principles extends React.Component {

  state = {
    canGoBack: false
  };

  render() {
    return <View style={{
      flex: 1,
      backgroundColor: '#101010',
    }}>

      <View style={{
        // borderBottomWidth: 1,
        // borderBottomColor: '#222',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{position: 'absolute', left: 0}}>
          <TouchableOpacity
            style={{
              padding: 10, paddingBottom: 7, paddingRight: 21
            }}
            onPress={() => {
              requestAnimationFrame(() => {
                if (!this.state.canGoBack) {
                  this.props.navigation.goBack()
                } else {
                  this.webView.goBack();
                }
              })
            }}>
            <Ionicons name='ios-arrow-back' size={37} color='#ddd'/>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={[gs.text, {
            fontSize: 19,
            padding: 10,
            textAlign: 'center'
          }]}>
            Training principles
          </Text>
        </View>
      </View>


      <WebView
        ref={(ref) => {
          this.webView = ref
        }}
        onNavigationStateChange={(event) => {
          this.setState({canGoBack: event.canGoBack});
        }}
        source={{
          html: `<style>
html {padding: 1.5em; font-family: "Times Roman", times, serif; font-size: 2.3em}
p {color: #101010; text-align: justify; text-indent: 2em; }
h1 {text-align: center; font-size: 1.7em}
li {text-align: justify; margin-top: 1.1em; }
li a {text-decoration: none;}
</style>

 <h1>Workout split and frequency</h1>
<p>After workout our bodies have <b>increased synthesis of proteins</b> that heals and increases the size of our muscles. This process lasts roughly between <b>36 and 48 hours</b> <b>[1]</b>.</p>
<p>Research shows that splitting the workout volume gives better results. Asterius does that based on your workout frequency. That’s why if you once or twice per week you get one workout and if you train five or six times you will have three different workouts. This way you will be able to train every group <b>at least twice per week</b>, which is better than once <b>[2]</b>. Rotate between your generated workouts every time you hit the gym.</p>

<h1>Your workouts design</h1>
<p>The factor that determines our muscle growth is the <b>overall workout volume</b> <b>[3]</b>. It is basically equal to <b>amount of sets</b> per muscle group. But keep in mind that most exercises train <b>multiple muscles at once</b>.</p>
<p>If we don’t do enough volume, our muscles won’t have enough stimulus to grow. But if we do too much sets, we will overtrain our muscles which will stop the progress and might even injure us. We need to avoid injuries at all cost, because they are the biggest setback.</p>
<p>Asterius generates balanced workout for our bodies based on multiple factors that you provide in the beginning. If you select preferred muscles, the system will incorporate isolation exercises that target these muscles specifically. But keep in mind that if you don’t have enough overall training time Asterius will prioritize the more balanced type of workouts. This is better in the long run for your posture and strength.</p>

	<h1>Performing and logging workouts</h1>
	<p>Stop your set <b>one or two reps before failure</b>.  That way we can perform more overall volume and <b>reduce the risk of injury</b> <b>[4]</b>. Research shows that muscles grows the most in the <b>8-12 reps range</b>[5]</b>. In order to design our workouts, we have to learn a bit of anatomy. Our muscles are made of two fiber types <b>[6]</b>:</p>
	<ul>
	<li>Type 2 or “Fast” fibers are <b>more powerful and bigger</b>. They generate <b>bigger power output</b> in heavy lifts but get <b>exhausted first</b>. That is why our first sets must be the heaviest.</li>
	<li>Type 1 or “Slow” fibers are <b>less powerful and smaller</b>. These fibers <b>generate less power</b>, but for <b>longer periods</b>. They become more active when we perform lighter sets but with more reps.</li>
	</ul>
		<p>If you perform hard compound exercise that involves a lot of muscles, your first set can be <b>warm-up set</b>. It will warm-up and stretch the muscles and focus you on the movement. It is important to focus your attention on the form of the exercise and to think about the muscles you train <b>[7]</b>. If you decide to do warm-up set, select a <b>light weight and do 15-20 repetitions</b>. You don’t have to log it, because it is not part of the main workout volume.</p>
	<p>Start your first working set with a weight that allows you to fail at the 9-10 reps range. Perform <b>7-8 reps</b> with it. The following sets you can do with <b>reduced weight, but try to increase the reps</b>. Final set can be performed to <b>failure in the 12+ reps range</b>. This approach leads to “<b>muscle pump</b>” (metabolic stress <b>[8]</b>) which is cool and might improve our results.</p>
	<!--<img src="/src/assets/assets/sets.jpg" alt="" />-->
<h1>Progress by overloading</h1>
<p>By performing resistance training the muscles adapt to the intensity. For progress to take place, the workout intensity has to grow steadily <b>[9]</b>. Try to increase the weight across all sets slowly, workout after workout. You can also increase the reps for particular set between workouts. But keep in mind the principles above. Focus on <b>heavy weight in the first sets</b> and focus on <b>repetitions in the final ones</b>. Try to stay <b>around the 8-12 reps range</b>.</p>
<h1>Rest intervals</h1>
<p>Research has <b>not yet found a clear winner</b> between smaller and bigger rest intervals <b>[10]</b>. Since the <b>most important factors</b> are the overall workout volume and the progressive overload, we recommend to rest as much as it is needed. If you don’t rest enough, you <b>might not be able to perform</b> the needed reps for progress. And if you rest too much, you are just <b>wasting your time</b>. So just rest until you <b>recover your breath and feel ready to perform</b> the next set.</p>


<h1>Nutrition and weight</h1>
<p>Good way to track your progress is by <b>measuring your weight daily</b>. But keep in mind that your weight can vary and is dependent on different factors. That’s why it is best to measure your weight <b>as often as possible</b>.</p>
<p>You don't need to follow rigid diet to accomplish your fitness goals. You need to simply stick to your <b>calories and macronutrients</b> (proteins, fats and carbohydrates). This approach is way more easier and less exhausting <b>[11]</b>. Asterius adjusts your macronutrients based on your body composition and goals. We recommend <b>tracking</b> them in an app like <b>myfitnesspal</b>.</p>
  </p>


  <h1>REFERENCES</h1>

<ol>
  <li><a href="https://www.ncbi.nlm.nih.gov/pubmed/8563679">MacDougall JD, Gibala MJ, Tarnopolsky MA, MacDonald JR, Interisano SA,
Yarasheski KE. The time course for elevated muscle protein synthesis following
heavy resistance exercise. Can J Appl Physiol. 1995 Dec</a></li>

 <li><a href="https://www.ncbi.nlm.nih.gov/pubmed/27102172">Schoenfeld BJ, Ogborn D, Krieger JW. Effects of Resistance Training Frequency
on Measures of Muscle Hypertrophy: A Systematic Review and Meta-Analysis. Sports
Med. 2016 Nov</a></li>

 <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4562558">Mangine GT, Hoffman JR, Gonzalez AM, Townsend JR, Wells AJ, Jajtner AR, Beyer
KS, Boone CH, Miramonti AA, Wang R, LaMonica MB, Fukuda DH, Ratamess NA, Stout
JR. The effect of training volume and intensity on improvements in muscular
strength and size in resistance-trained men. Physiol Rep. 2015 Aug</a></li>

 <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4731492">Nóbrega SR, Libardi CA. Is Resistance Training to Muscular Failure Necessary? Frontiers in Physiology. 2016</a></li>

 <li><a href="https://www.ncbi.nlm.nih.gov/pubmed/24714538">Schoenfeld BJ, Ratamess NA, Peterson MD, Contreras B, Sonmez GT, Alvar BA.
Effects of different volume-equated resistance training loading strategies on
muscular adaptations in well-trained men. J Strength Cond Res. 2014
Oct</a></li>

 <li><a href="https://www.ncbi.nlm.nih.gov/pubmed/21912291">Wilson JM, Loenneke JP, Jo E, Wilson GJ, Zourdos MC, Kim JS. The effects of
endurance, strength, and power training on muscle fiber type shifting. J Strength
Cond Res. 2012 Jun</a></li>

 <li><a href=https://www.ncbi.nlm.nih.gov/pubmed/26700744">Calatayud J, Vinstrup J, Jakobsen MD, Sundstrup E, Brandt M, Jay K, Colado JC,
Andersen LL. Importance of mind-muscle connection during progressive resistance
training. Eur J Appl Physiol. 2016 Mar</a></li>

 <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5489423/">De Freitas MC, Gerosa-Neto J, Zanchi NE, Lira FS, Rossi FE. Role of metabolic stress for enhancing muscle adaptations: Practical applications. World Journal of Methodology. 2017</a></li>


 <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4562558/">Mangine GT, Hoffman JR, Gonzalez AM, et al. The effect of training volume and intensity on improvements in muscular strength and size in resistance-trained men. Physiological Reports. 2015</a></li>

 <li><a href="https://www.ncbi.nlm.nih.gov/pubmed/26605807">Schoenfeld BJ, Pope ZK, Benik FM, Hester GM, Sellers J, Nooner JL, Schnaiter
JA, Bond-Williams KE, Carter AS, Ross CL, Just BL, Henselmans M, Krieger JW.
Longer Interset Rest Periods Enhance Muscle Strength and Hypertrophy in
Resistance-Trained Men. J Strength Cond Res. 2016 Jul</a></li>

 <li><a href="https://www.ncbi.nlm.nih.gov/pubmed/11883916">Stewart TM, Williamson DA, White MA. Rigid vs. flexible dieting: association
with eating disorder symptoms in nonobese women. Appetite. 2002 Feb</a></li>
</ol>
`
        }}
      />

    </View>
  }
}