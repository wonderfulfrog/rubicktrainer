/**
 *  DotaQuiz
 *  Wonderful Failure LLC
 *  Devin Lumley
 *  Anthony Grimaldi
 *
 */


/** --Problem--
 *  questions: Choices
 *  answer: Solution
 *
 */

/** --Choices--
 *  Array of Abilities
 *
 */

/** --Ability--
 *  name: String
 *  internalName: String
 *  description: String
 *  lore: String
 *  manaCost: String
 *  cooldown: String
 *  damage: String
 *  damageType: String
 *  img_src: function(): void => String
 *
 */

/** --Solution--
 *  answer: Ability
 *  hint: String
 *
 */

/** --Hero--
 *  name: String
 *  internalName: String
 *  abilities: Array of Ability
 *  bio: String
 *  img_src: function(): void => String
 */

var NUM_HERO_CHOICES = 3;

var heroData = [];
var abilityData = [];
var problem;
var choices = [];

/**
 * Returns a random element of the array
 */
Array.prototype.getRandom = function() {
    var randomComponent = Math.floor( Math.random() * this.length );
    return this[randomComponent];
}

/**
 * Pops a random element from the array
 */
Array.prototype.popRandom = function() {
    var randomComponent = Math.floor( Math.random() * this.length );
    var element = this[randomComponent];
    this.splice(randomComponent, 1);
    return element;
}

Array.prototype.getUnique = function() {
    var uniqueValues = this.filter(function(itm, i, a){
        return i == a.indexOf(itm);
    });
    return uniqueValues;
}

/**
 * Loads all data from heroes from a JSON file
 */
function loadHeroData() {
	//console.log('Loading hero data');

	var excludedAbilities = [
		'shredder_return_chakram',
		'wisp_spirits_in',
		'wisp_spirits_out',
		'wisp_tether_break',
		'keeper_of_the_light_illuminate_end',
		'keeper_of_the_light_spirit_form_illuminate',
		'keeper_of_the_light_spirit_form_illuminate_end',
		'naga_siren_song_of_the_siren_cancel',
		'rubick_telekinesis_land',
		'ogre_magi_unrefined_fireblast',
		'lone_druid_true_form_druid',
		'shadow_demon_shadow_poison_release',
		'invoker_quas',
		'invoker_wex',
		'invoker_exort',
		'alchemist_unstable_concoction_throw',
		'ancient_apparition_ice_blast_release',
		'templar_assassin_trap',
		'kunkka_return',
		'puck_ethereal_jaunt',
		'nevermore_shadowraze2',
		'nevermore_shadowraze3',
		'morphling_morph_replicate',
		'bane_nightmare_end',
        'storm_spirit_ball_lightning',
        'witch_doctor_paralyzing_cask'
	];

	return $.ajax({
		type: 'GET',
		url: 'data/heroes.json',
		dataType: 'json',
		success: function ( heroJSON ) {
			var heroes = heroJSON;
			for(var hero_key in heroes) {

                // Skip unavailable heroes
                if(heroes[hero_key].active == '0') continue;

				var hero = {
					name: heroes[hero_key].name,
					internalName: hero_key,
					bio: heroes[hero_key].heroBio,

					img_src: function() {
						return this.internalName;
					},

					abilities: []
				}

				var abilities = heroes[hero_key].spells;

				for(var ability_key in abilities) {

					var ability = {
						name: abilities[ability_key].name,
						internalName: ability_key,
						description: abilities[ability_key].description,
						lore: abilities[ability_key].lore,
						manaCost: abilities[ability_key].mana_cost,
						cooldown: abilities[ability_key].cooldown,
						damage: abilities[ability_key].damage,
						damageType: abilities[ability_key].damage_type,
                        abilityOwner: hero.name,

						img_src: function() {
							return this.internalName;
						},

                        toString: function() {
                            return this.internalName;
                        },

                        properties: []
					}

                    var properties = abilities[ability_key].properties;


                    for (var k = 0; k < properties.length; k++) {
                        var prop = properties[k];

                        var property = {
                            name: prop.name.replace(':',''),
                            value: prop.value
                        }

                        if(property.name != "") {
                            ability.properties.push(property);
                        }

                    }

					if($.inArray(ability_key, excludedAbilities) == -1) {
						hero.abilities.push(ability);
                        abilityData.push(ability);
                    }
				}
				heroData.push(hero);
			}

            //console.log('Hero data loaded');
		},
		failure: function() {
			console.log('Error: Could not retrive hero data');
            return false;
		}
	});
}

/**
 * Capitalizes the first letter of a given string
 */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Returns a proper URI for ability images
 */
function imageURIForAbility(ability) {
    return 'http://cdn.dota2.com/apps/dota2/images/abilities/' + ability.internalName + '_lg.png';
}

function hideQuestion() {
    $('.ability').hide();
}


function easeQuestion() {
    $('.ability').delay(30).toggle('slide', { direction: 'left' }, 100);
}

function hideHeroes() {
    $('.choice').each( function() {
        $(this).stop(true, true).hide();
    });
}

function invalidateChoices() {
    $('.choice').each( function() {
        $(this).addClass('incorrect');
    });
}

function removeIncorrectClassFromHeroes() {
    $('.incorrect').each( function() {
        $(this).attr('class', 'choice');
    })
}

function easeHeroes() {
    var i = 0.5;
    $('.choice').each( function() {
       $(this).delay(150 * i).toggle('slide', { direction: 'up'}, 125);
       i = i + 0.5;
    });
}

function flashScore() {
    $(".score_value").stop().animate({ color: "#2bab01"}, 50).animate({ color: "#ae3e3e"}, 1750);
}

function flashStreak() {
    $(".streak_value").stop().animate({ color: "#2bab01"}, 50).animate({ color: "#ae3e3e"}, 1750);
}

function flashEndStreak() {
    $(".streak_value").stop().animate({ color: "#aa0000"}, 50).animate({ color: "#ae3e3e"}, 1750);
}


function flashGuesses() {
    $(".guesses_value").stop().animate({ color: "#aa0000"}, 50).animate({ color: "#ae3e3e"}, 1750);
}

function hideLoading() {
    $('.loading').hide();
}

function showConfirmButton() {
    $('.confirm').show();
}

function revealGame() {
    $('.dotaquiz').show();
}

function highlightAnswer() {
    $('.answer').addClass('hilight');
}

function hideAnswerClass() {
    $('.choice').each( function() {
        $(this).removeClass('answer');
    })
}

function hideHelpMessage() {
    $('.help_screen .box').toggle('slide', { direction: 'down'}, 200);
    $('.help_screen').toggle('fade', 100);
}

function toggleGameOver() {
    if($('.gameOver').is(':hidden')) {
        $('.gameOver').show('bounce', { direction: 'up'}, 1200);
        $('.scoreBox').hide();
        $('.question').addClass('inactive');
        $('.ability').addClass('inactive');
    }
    else {
        $('.gameOver').hide();
        $('.scoreBox').show();
        $('.question').removeClass('inactive');
        $('.ability').removeClass('inactive');
    }
}

function isUsefulProperty(prop) {
    if(prop == "") return false;
    else if(parseInt(prop) == 0) return false;
    else if(parseInt(prop) == 0.0) return false;
    else return true;
}

function generateBunkChoice(value) {
    if(isInt(value)) {
        // Value is int, let's generate random int numbers based on range
        var num = parseInt(value);

        if(num <= 4)
            return nearest( Math.floor( (Math.random() * 4) + 1), 1);

        //Random number is between [value*2, value/4], rounded to the nearest value/3
        return nearest(Math.floor( Math.random() * ( (num * 1.25) - (num / 4) ) + (num / 3) ), reasonableRange(num) );
    }
    else {
        // Value is float, let's generate random remainders instead
        var num = parseFloat(value);
        return parseFloat((Math.random() * (num - parseInt(num))) + num).toFixed(2);
    }
}

function reasonableRange(value) {
    if(value < 0)
        value = value * -1;

    if(value % 100 == 0 && value > 400) return 100;
    else if(value % 75 == 0 && value > 300) return 75;
    else if(value % 50 == 0 && value > 200) return 50;
    else if(value % 25 == 0 && value > 100) return 25;
    else if(value % 15 == 0 && value > 60) return 15;
    else if(value % 10 == 0 && value > 40) return 10;
    else if(value % 5 == 0 && value > 20) return 5;
    else if(value % 2 == 0 && value > 8) return 2;
    else return 1;
}

function isInt(n) {
   return n % 1 === 0;
}

function nearest(n, v) {
    n = n / v;
    n = Math.round(n) * v;
    return n;
}

(function () {
    "use strict";

    var BASE_SCORE_BONUS = 200;
    var STREAK_BONUS = 0.15;
    var defaultQuestions = [1,2,3];
    var tempHeroData;
    var tempAbilityData;
    var questionList;
    var Game = {
        correct: 0,
        streak: 0,
        highestStreak: 0,
        attemptsLeft: 7
    };

    //
    $(document).ready(function() {
        // Load data
        hideHeroes();
        hideQuestion();
        loadHeroData().done(function () {
            //console.log("Game is ready");
            hideLoading();
            showConfirmButton();
            $('.confirm').click( function() {
                hideHelpMessage();
                Game.newGame();
                revealGame();
            });

            $('.newGame').click( function() {
                Game.newGame();
                revealGame();
                toggleGameOver();
            })
        });

        // Generates a question: void => Problem
        function generateQuestion() {
            if(tempAbilityData.length == 0)
                tempAbilityData = abilityData.slice(0);

            if(questionList.length == 0)
                questionList = defaultQuestions.slice(0);

            var randomQuestion = questionList.popRandom();
            var validQuestion = false;

            while(!validQuestion) {
                var randomAbilityProperty;
                var randomComponent = Math.floor( Math.random() * tempAbilityData.length );
                var randomAbility = tempAbilityData[randomComponent];

                if(randomAbility) {
                    if(randomQuestion == 1 && randomAbility.manaCost != "") {
                        var uniqueValues = randomAbility.manaCost.split(' ').getUnique();

                        if(isUsefulProperty(uniqueValues[0])) {
                            randomAbilityProperty = {
                                name: "MANA COST",
                                value: randomAbility.manaCost
                            }

                            validQuestion = true;
                        }
                    }

                    if(randomQuestion == 2 && isUsefulProperty(randomAbility.cooldown)) {
                        var uniqueValues = randomAbility.cooldown.split(' ').getUnique();

                        if(isUsefulProperty(uniqueValues[0])) {
                            randomAbilityProperty = {
                                name: "COOLDOWN",
                                value: randomAbility.cooldown
                            }

                            validQuestion = true;
                        }
                    }

                    if(randomQuestion == 3 && isUsefulProperty(randomAbility.damage)) {
                        var uniqueValues = randomAbility.cooldown.split(' ').getUnique();

                        if(isUsefulProperty(uniqueValues[0])) {
                            randomAbilityProperty = {
                                name: "DAMAGE",
                                value: randomAbility.damage
                            }

                            validQuestion = true;
                        }
                    }
                }
            }

            tempAbilityData.splice(randomComponent, 1);
            var uniqueValues = randomAbilityProperty.value.split(' ').getUnique();

            var level;
            var ignoreLevel = false;

            // If there is only one unique value of a property, then ignore the level
            // requirement
            if(uniqueValues.length == 1) {
                level = 0;
                ignoreLevel = true;
            }
            else {
                level = Math.floor( (Math.random() * (uniqueValues.length) ) );
            }

            var answer;

            if(isInt(uniqueValues[level])) {
                answer = parseInt(uniqueValues[level]);
            } else {
                answer = parseFloat(uniqueValues[level]);
            }

            if(ignoreLevel)
                level = -1;
            else
                level++;

            var choices = Game.generateChoices(answer);

            var randomIndex = Math.round( Math.random() * choices.length );
            choices.splice(randomIndex, 0, answer);

            var problem = {
                choices: choices,
                question: randomAbility,
                property: randomAbilityProperty,
                level: level,
                answer: answer
            }

            return problem;
        }

        // newGame: Resets Game values to default and starts a new round
        Game.newGame = function() {
            this.score = 0;
            this.streak = 0;
            this.attemptsLeft = 7;

            //Reset hero data
            tempHeroData = heroData;
            tempAbilityData = abilityData.slice(0);
            questionList = defaultQuestions.slice(0);

            //Set defaults
            this.updateScore();
            this.updateAttempts();
            this.updateStreak();

            //
            this.nextRound();
            removeIncorrectClassFromHeroes();
        }

        // endGame: Game Over
        Game.endGame = function() {
            // Do endgame stuff here
            //hideHeroes();
            invalidateChoices();

            var answer = this.problem.answer;

            $('.choice').each( function() {
                if($(this).html() == answer)
                    $(this).addClass('hilight');
            });

            toggleGameOver();

            $('.gameOver .highestStreakValue').html(this.highestStreak);
            $('.gameOver .finalScoreValue').html(this.score);

            // Launch new game
            //this.newGame();
        }

        // nextRound: Progresses the game to the next round.
        Game.nextRound = function() {
            this.problem = generateQuestion();

            // Randomly insert answer into choices (temporary fix)
            /*var randomIndex = Math.floor(Math.random()*4)
            console.log("--Index of Answer--");
            console.log(randomIndex);
            console.log("--Answer--");
            console.log(this.problem.answer);
            //this.problem.choices.splice(randomIndex, 0, this.problem.answer);
            console.log("Choices after Splice");
            console.log(this.problem.choices);*/
            // End fix

            //
            removeIncorrectClassFromHeroes();
            hideQuestion();
            hideHeroes();
            hideAnswerClass();
            this.updateQuestion();
            this.updateChoices();
            easeQuestion();
            easeHeroes();
        }

        // Update the HTML displaying the player's score
        Game.updateScore = function() {
        	$(".score_value").html(this.score);
        }

        // Update the HTMl displaying the player's remaining attempts
        Game.updateAttempts = function() {
            $(".guesses_value").html(this.attemptsLeft);
        }

        // Update the HTML displaying the player's streak
        Game.updateStreak = function() {
            $(".streak_value").html(this.streak);
        }

        // Update the HTML displaying the ability in question's icon
        Game.updateQuestion = function() {
            $(".ability .icon").html('<img src="'+imageURIForAbility(this.problem.question)+'">');
            $(".ability .info .name").html(this.problem.question.name);
            $(".ability .info .description").html(this.problem.question.description.replace( /\\n/g, "<br />" ));

            $(".question .property").html(this.problem.property.name);
            $(".question .heroName").html(this.problem.question.abilityOwner.toUpperCase() + "\'S");
            $(".question .abilityName").html(this.problem.question.name.toUpperCase());

            if(this.problem.level == -1)
                $(".question .level").hide();
            else
                $(".question .level").html("level " + this.problem.level).show();
        }

        // Update the HTML displaying the player's choices
        Game.updateChoices = function() {
            $(".choices ul li").each(function(index) {
                $(this).html(Game.problem.choices[index]);

                $(this).unbind("click");
                $(this).click(function() {
                    if(!$(this).hasClass('incorrect')) {
                        Game.selectResponse(Game.problem.choices[index], this)
                    }
                });
            });
        }

        // Add points to total score
        Game.addToScore = function(points) {
            this.score += points;
            flashScore();
            this.updateScore(this.score);
        }

        Game.addToAttempts = function() {
            this.attemptsLeft += 1;
            this.updateAttempts();
        }

        // Remove 1 attempt, end game if attempts reaches 0
        Game.removeAttempt = function() {
            this.attemptsLeft -= 1;
            flashGuesses();
            this.updateAttempts();

            // Game over if the player runs out of attempts
            if (this.attemptsLeft <= 0) {
                this.endGame();
            }
        }

        // Extend the streak by 1
        Game.extendStreak = function() {
            this.streak += 1;
            flashStreak();
            this.updateStreak();

            if(this.streak % 6 == 0) {
                this.addToAttempts();
            }

            if(this.streak > this.highestStreak) {
                this.highestStreak = this.streak;
            }
        }

        // Reset streak to 0
        Game.endStreak = function() {
            this.streak = 0;
            flashEndStreak();
            this.updateStreak();
        }

        // selectReponse: string => void
        Game.selectResponse = function(userSelection, element) {
            // Wait until choice has stopped animating before being selectable
            if(!$('.choices ul li').is(':animated')) {
                if (userSelection == this.problem.answer) {
                    // Player chose correctly
                    var pointsEarned = BASE_SCORE_BONUS + Math.round( BASE_SCORE_BONUS * this.streak * STREAK_BONUS );
                    this.addToScore(pointsEarned);
                    this.extendStreak();
                    this.nextRound();
                } else {
                    // Player chose incorrectly
                    $(element).addClass('incorrect');
                    this.removeAttempt();
                    this.endStreak();
                }
            }
        }

        /**
         * Generates a list of choices that aren't the same as the answer
         */
        Game.generateChoices = function(answer) {
            var newChoices = [];
            var i = 0;

            while(newChoices.length < NUM_HERO_CHOICES) {
                var newAnswer = generateBunkChoice(answer);

                if(!this.valueInArray(newAnswer, newChoices) && newAnswer != answer) {
                    newChoices.push(newAnswer);
                }
            }

            return newChoices;
        }

        Game.valueInArray = function(value, values) {
            for (var i = 0; i < values.length; i++) {
                if(value == values[i])
                    return true;
            }

            return false;
        }

        Game.formatAbilityProperty = function(abilityText) {
            var tokens = abilityText.split(' ');
            var newString = [];

            var uniqueTokens = tokens.filter(function(itm, i, a){
                return i == a.indexOf(itm);
            });

            for(var i in uniqueTokens) {
                var token = tokens[i];
                token = "<em>" + token + "</em>"
                newString.push(token);
            }

            return newString.join(" / ");
        }

        Game.abilityPropertyIsEmpty = function(abilityText) {
            var tokens = abilityText.split(' ');

            if(tokens.length == 0)
                return true;

            var uniqueTokens = tokens.filter(function(itm, i, a){
                return i == a.indexOf(itm);
            });

            if(uniqueTokens[0] == "0" || uniqueTokens[0] == "0.0")
                return true;
            else
                return false;

        }
    });
})();
