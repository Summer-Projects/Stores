var main = function() {
    $(".rules").hide();
    $(".game").hide();
    $(".ruleButton").click(function() {
        $(".homePage").hide(1000);
        $(".rules").fadeIn(1000);
    });
    $(".back").click(function() {
        $(".rules").hide(1000);
        $(".game").hide(1000);
        $(".homePage").fadeIn(1000);
    });
    $(".gameButton").click(function() {
        $(".homePage").hide(1000);
        $(".game").fadeIn(1000);
    });
    $(".hide").click(function() { 
        $(".hide, .back").fadeOut(1000)
    });
    $(".goTGame").click(function() {
        $(".rules").hide(1000);
        $(".game").fadeIn(1000);
    });

    function player(name) {
        this.money = 15,
        this.properties = 1,
        this.workers = 0,
        this.name = name,
        this.shares = 5
    }

    var me = new player("You");
    var ai1 = new player("AI1");
    var ai2 = new player("AI2");
    var ai3 = new player("AI3");
    var winner1;
    var winner2;
    var winner3;

    var money_to_earn = function() {
        var money_left_to_earn = 500000 - me.money
        alert("$" + money_left_to_earn + " left to earn");
    }

    var max_money = function() {
        if(ai1.money > ai2.money && ai1.money > ai3.money && ai1.money > me.money) {
            alert("Ai1 is in the lead with $" + ai1.money)
        }else if(me.money > ai2.money && me.money > ai3.money && me.money > ai1.money) {
            alert("You are in the lead with $" + me.money)
        }else if(ai2.money > ai1.money && ai2.money > ai3.money && ai2.money > me.money) {
            alert("Ai2 is in the lead with $" + ai2.money)
        }else if(ai3.money > ai2.money && ai3.money > me.money && ai3.money > ai1.money) {
            alert("Ai3 is in the lead with $" + ai3.money)
        }else{
            alert("It is a tie between some(or all) of the leading players!")
        }
    }

    var round = 0;

    var beginRound = function() {
        var rollDice = function() {
            return Math.floor(Math.random()*6);
        }
        var buyWorkers = function(ai) {
            if (Math.floor((ai.money - 5)/21) > 0) {
                var toBuy = Math.floor((ai.money - 10)/20);
                var cost = toBuy * 20;
                ai.workers += toBuy;
                ai.money -= cost;
            }
            confirm(ai.name + " bought " + ai.workers + " workers");
        }
        var youBuyWorkers = function() {
            var ask = function() {
                var max = Math.floor(me.money/20);
                var askP = prompt("How many workers would you like to buy? You have " + me.money + " dollars. The most you can buy is " + max)*1;
                if (me.money - (askP * 20) < 0) {
                    confirm("Oops! Sorry, it looks like you don't have enough money.");
                    ask();
                }else if(isNaN(askP)) {
                    alert("Sorry! That is not a number!");
                    ask();
                } else {
                    var cost = askP*20;
                    me.workers += askP;
                    me.money -= cost;
                    confirm("You bought " + me.workers + " workers");
                }
            }

            ask();
        }

        youBuyWorkers();
        buyWorkers(ai1);
        buyWorkers(ai2);
        buyWorkers(ai3);

        var getMoneyW = function(p) {
            pValue = p.workers * 5 + 5;
            money = rollDice() * pValue;
            p.money += money;
        }
        var getMoneyM = function(pl) {
            getMoneyW(pl);
            getMoneyW(pl);
            getMoneyW(pl);
            getMoneyW(pl);
            if (pl === me) {
                confirm(pl.name + " have " + pl.money + " dollars");
            } else {
                confirm(pl.name + " has " + pl.money + " dollars");
            }
            pl.workers = 0;
        }

        getMoneyM(me);
        getMoneyM(ai1);
        getMoneyM(ai2);
        getMoneyM(ai3);    
        var taxPayer = function() {
            round += 1
            var rounds_left_until_tax_day = 6 - round
            alert("The round is round " + round + " which means you have " + rounds_left_until_tax_day + " days until taxday.")
            if(round === 6) {
                alert("Tax day: Everybody loses 10% of their money.");
                me.money = me.money * 0.9
                ai1.money = ai1.money * 0.9
                ai2.money = ai2.money * 0.9
                ai3.money = ai3.money * 0.9
                round = 0
            }
        }
        taxPayer();
        var checkWinner = function() {
            var list = [];
            var cMoney = function(pl) {
                if (pl.money > 500000) {
                    list.push(pl)
                }
            }
            cMoney(me);
            cMoney(ai1);
            cMoney(ai2);
            cMoney(ai3);
            if (list.length == 1) {
                winner1 = list[0];
                beginRound = function() {
                    confirm(winner1.name + " won with " + winner1.money + "!");
                }
                beginRound();
            } else if (list.length == 2) {
                winner1 = list[0];
                winner2 = list[1];
                beginRound = function() {
                    confirm(winner1.name + " and " + winner2.name + " both won with over 500,000!");
                }
                beginRound();
            } else if (list.length == 3) {
                winner1 = list[0];
                winner2 = list[1];
                winner3 = list[2];
                beginRound = function() {
                    confirm(winner1.name + ", " + winner2.name + ", and " + winner3.name + " won with over 500,000!");
                }
                beginRound();
            } else if (list.length == 4) {
                beginRound = function() {
                    confirm("Everybody won with over 500,000!");
                }
                beginRound();
            }
        }
        checkWinner();
    }
}

$(document).ready(main);
