'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filteredMens = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100));

  const mensCount = filteredMens.length;

  return filteredMens.reduce((sumAge, person) => sumAge
    + (person.died - person.born), 0) / mensCount;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => person.sex === 'f'
      && people.find(child => child.mother === person.name));

  const womenCount = filteredWomen.length;

  return filteredWomen.reduce((sumAge, person) => sumAge
    + (person.died - person.born), 0) / womenCount;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChild = !onlyWithSon
    ? people.filter(child => (people.find(mother =>
      mother.name === child.mother)))
    : people.filter(child => (people.find(mother => mother.name
      === child.mother) && child.sex === 'm'));

  const filteredKids = filteredChild.length;

  return filteredChild.reduce((sumAge, child) => {
    return (sumAge + child.born - (people.find(mother => (
      mother.name === child.mother))).born);
  }, 0) / filteredKids;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
