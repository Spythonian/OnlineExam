/****************************************
 ***************QUIZ CONTROLLER**********
 ***************************************/

 var quizController = (function() {
    /**************QUESTION CONSTRUCTOR*****
     ***************************************/
    function Question(id, questionText, options, correctAnswer) {
        this.id = id;
        this.questionText = questionText;
        this.option = options;
        this.correctAnswer = correctAnswer;
    }
    var questionLocalStorage = {
        setQuestionCollection: function(newCollection) {
            localStorage.setItem ('questionCollection', JSON.stringify(newCollection));
        },
        getQuestionCollection: function() {
            return JSON.parse(localStorage.getItem('questionCollection'));
        },
        removeQuestionCollection: function() {
            localStorage.removeItem('questionCollection');
        }
    };

    return {
        addQuestionDomLocalStorage: function(newQuestionText, opts) {
            var optionsArr, corrAns, questionId, newQuestion, getStoredQuestions, isChecked;

            if(questionLocalStorage.getQuestionCollection() === null) {
            questionLocalStorage.setQuestionCollection([]);
            }
            optionsArr = [];

            isChecked = false;

            for(var i = 0; i < opts.length; i++) {
                if(opts[i].value !== "") {
                    optionsArr.push(opts[i].value);
                }
                if(opts[i].previousElementSibling.checked && opts[i].value !== "") {
                    corrAns = opts[i].value;
                    isChecked = true;
                }
            }
            // [ {id: 0} {id: 1}   ]

            if(questionLocalStorage.getQuestionCollection().length > 0) {
                questionId =  questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
            } else {
                questionId = 0;
            }

            if(newQuestionText.value !== "") {
                    if(optionsArr.length > 1) {
                        if(isChecked) {

                            newQuestion = new Question(questionId, newQuestionText.value, optionsArr, corrAns);
                            getStoredQuestions = questionLocalStorage.getQuestionCollection();
                            getStoredQuestions.push(newQuestion);

                            questionLocalStorage.setQuestionCollection(getStoredQuestions);
                            
                            newQuestionText.value = "";
                            for(var x = 0; x < opts.length; x++) {
                                opts[x].value = "";
                                opts[x].previousElementSibling.checked = false;
                            }
                            console.log(questionLocalStorage.getQuestionCollection()); 
                        } else {
                            alert('You missed to check correct answer, or you checked answer without value')
                        }
                    } else {
                        alert('You must insert at least two options')
                    }
            } else {
                alert('Please, Insert Question')
            }
            
        }
    };

})();


/****************************************
 ***************UI CONTROLLER***********
 ***************************************/

var UIController = (function () {
    
    var domItems = {
        //**************ADMIN PANEL ELEMENTS****/
        questionInsertBtn: document.getElementById('question-insert-btn'),
        newQuestionText: document.getElementById("new-question-text"),
        adminOptions: document.querySelectorAll(".admin-option")

    };

    return {
        getDomItems: domItems
    };

})();

/****************************************
 **************CONTROLLER****************
 ***************************************/
var controller = (function(quizCtrl, UICtrl) {
    var selectedDomItems = UICtrl.getDomItems; 
    
    selectedDomItems.questionInsertBtn.addEventListener('click', function() {
        quizCtrl.addQuestionDomLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOptions);


    });

})(quizController, UIController);