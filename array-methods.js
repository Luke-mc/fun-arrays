var dataset = require('./dataset.json');
var _ = require('lodash');


/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(element => element.amount > 100000 );

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = dataset.bankBalances.map(({amount,state})=>({

    amount,
    state,
    rounded : Math.round(amount),

}));

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/

var datasetWithRoundedDime = dataset.bankBalances.map(({amount, state})=>({

    amount,
    state,
    roundedDime : Math.round(amount * 10) / 10,

}));

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object

var sumOfBankBalances = dataset.bankBalances.reduce((accumulator, currentValue)=>{

  var result = accumulator += parseFloat(currentValue.amount);

  return Math.round(result * 100) / 100;

},0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */


function percent(amount){
    var result =   parseFloat(Math.round(((amount /100) * 18.9) * 100)/100);
    return result;
  }

var sumOfInterests = dataset.bankBalances.filter(({state})=>{
    return ["WI", 'IL','WY','OH','GA','DE'].indexOf(state) !== -1;

}).reduce((accumulator,currentValue)=>{

    var perc = percent(currentValue.amount);
    accumulator += perc;

    var final = (Math.round(accumulator * 100)/100);
    return final;

},0);


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */


var newObj = {};

var stateSums = newObj;

dataset.bankBalances.map((element)=>{

  if(newObj.hasOwnProperty(element.state) === false){
    newObj[element.state] =  parseFloat(element.amount);

  }
  else if(newObj.hasOwnProperty(element.state) === true){
    newObj[element.state] +=  parseFloat(element.amount);

  }

  newObj[element.state] =  (Math.round(newObj[element.state] * 100) / 100);

  return newObj;
});




/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it
  only sum values greater than 50,000 and save it to `sumOfInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */




var sumOfHighInterests = Object.keys(stateSums).filter((state)=>{
    return ["WI", 'IL','WY','OH','GA','DE'].indexOf(state) === -1;

}).map((state)=>{
console.log(stateSums);
    return {
      state,
      amount: (stateSums[state] * 0.189),
    };

}).filter((state)=>{

   return state.amount > 50000;

}).reduce((accumulator,account)=>{

    accumulator += account.amount;
    var final =  (Math.round(accumulator * 100)/100);

    return final;


},0);
/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = Object.keys(stateSums).filter((state)=>{
    return stateSums[state] < 1000000;
});

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */

var higherStateSums = Object.keys(stateSums).filter((state)=>{
      return stateSums[state] > 1000000;
}).map((state)=>{
      return {
        state: state,
        amount: stateSums[state],
      };
}).reduce((accumulator,state)=>{
      accumulator += state.amount;
      var final = parseFloat(Math.round(accumulator * 100)/100);
      return final;
},0);
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = Object.keys(stateSums).filter((element)=>{

    return ["WI", 'IL','WY','OH','GA','DE'].indexOf(element) !== -1;

}).map((account)=>{

    return {
      state: account,
      amount: stateSums[account],
    };

}).every((account)=>{
    return account.amount > 2550000;
  });

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = Object.keys(stateSums).filter((element)=>{

    return ["WI", 'IL','WY','OH','GA','DE'].indexOf(element) !== -1;

}).map((account)=>{

    return {
      state: account,
      amount: stateSums[account],
    };

}).filter((account)=>{

  return account.amount > 2550000;

}).every((account)=>{

    return account.amount > 2550000;

});


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
