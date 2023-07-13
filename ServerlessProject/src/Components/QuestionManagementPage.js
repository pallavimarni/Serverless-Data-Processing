import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Grid,
    Box,
    Paper,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Tabs,
    Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    questionCard: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    answerText: {
        fontWeight: 'bold',
        marginTop: theme.spacing(1),
    },
    editDialog: {
        minWidth: 400,
    },
    dropdownContainer: {
        marginBottom: theme.spacing(2),
    },
    categoryList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: theme.spacing(2),
    },
    categoryItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: theme.spacing(1),
    },
}));

const QuestionManagementPage = () => {
    const classes = useStyles();
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState('');
    const [editedOptions, setEditedOptions] = useState({
        OptionA: '',
        OptionB: '',
        OptionC: '',
        OptionD: '',
        DifficultyLevel: '',
        Answer: '',
    });
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        difficultyLevel: '',
        category: '',
        answer: '',
    });
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentTab, setCurrentTab] = useState(0);
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchQuestions();
        fetchCategories();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/questions');
            setQuestions(response.data.questions);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditQuestion = (questionId) => {
        const questionToEdit = questions.find((question) => question.id === questionId);
        if (questionToEdit) {
            setEditingQuestion(questionToEdit);
            setEditedQuestion(questionToEdit.Question);
            setEditedOptions({
                OptionA: questionToEdit.OptionA,
                OptionB: questionToEdit.OptionB,
                OptionC: questionToEdit.OptionC,
                OptionD: questionToEdit.OptionD,
                DifficultyLevel: questionToEdit.DifficultyLevel,
                Answer: questionToEdit.Answer,
            });
            setOpenEditDialog(true);
        }
    };

    const handleCloseEditDialog = () => {
        setEditingQuestion(null);
        setEditedQuestion('');
        setEditedOptions({
            OptionA: '',
            OptionB: '',
            OptionC: '',
            OptionD: '',
            DifficultyLevel: '',
            Answer: '', // Reset the answer value
        });
        setOpenEditDialog(false);
    };

    const handleNewQuestionChange = (field, value) => {
        setNewQuestion((prevQuestion) => ({
            ...prevQuestion,
            [field]: value,
        }));
    };

    const handleSaveEditedQuestion = async () => {
        if (!editingQuestion) return;

        const updatedQuestion = {
            ...editingQuestion,
            Question: editedQuestion,
            OptionA: editedOptions.OptionA,
            OptionB: editedOptions.OptionB,
            OptionC: editedOptions.OptionC,
            OptionD: editedOptions.OptionD,
            DifficultyLevel: editedOptions.DifficultyLevel,
            Answer: editedOptions.Answer, // Include the edited answer value
        };

        try {
            await axios.put(`http://localhost:5000/api/questions/${editingQuestion.id}`, updatedQuestion);
            fetchQuestions();
            handleCloseEditDialog();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            const questionToDelete = questions.find((question) => question.id === questionId);
            if (questionToDelete) {
                await axios.delete(`http://localhost:5000/api/questions/${questionToDelete.id}`);
                fetchQuestions();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddQuestion = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setNewQuestion({
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            difficultyLevel: '',
            category: '',
            answer: '', // Reset the answer value
        });
        setOpenAddDialog(false);
    };

    const handleSaveNewQuestion = async () => {
        const { question, optionA, optionB, optionC, optionD, difficultyLevel, category, answer } = newQuestion;

        const newQuestionData = {
            Category: category,
            Question: question,
            OptionA: optionA,
            OptionB: optionB,
            OptionC: optionC,
            OptionD: optionD,
            Answer: answer,
            DifficultyLevel: difficultyLevel,
        };

        try {
            await axios.post('http://localhost:5000/api/addquestions', JSON.stringify(newQuestionData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetchQuestions();
            handleCloseAddDialog();
        } catch (error) {
            console.log(error);
        }
    };

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleDeleteCategory = async (category) => {
        try {
            await axios.delete(`http://localhost:5000/api/categories/${category}`);
            fetchCategories();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddCategory = () => {
        setOpenAddCategoryDialog(true);
    };

    const handleCloseAddCategoryDialog = () => {
        setNewCategory('');
        setOpenAddCategoryDialog(false);
    };

    const handleSaveNewCategory = async () => {
        try {
            const newCategoryData = {
                Category: newCategory,
            };

            await axios.post('http://localhost:5000/api/addcategories', newCategoryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            fetchCategories();
            handleCloseAddCategoryDialog();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Question and Category Management
            </Typography>

            <Tabs value={currentTab} onChange={handleTabChange} centered>
                <Tab label="Question Management" />
                <Tab label="Category Management" />
            </Tabs>
            <br />
            <br />
            {currentTab === 0 && (
                <Box my={4}>
                    <Grid container spacing={2}>
                        {questions.map((question) => (
                            <Grid item xs={12} sm={6} key={question.id}>
                                <Paper className={classes.questionCard}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {question.Question}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Option A: {question.OptionA}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Option B: {question.OptionB}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Option C:{question.OptionC}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Option D: {question.OptionD}
                                    </Typography>
                                    <Typography variant="body1" className={classes.answerText}>
                                        Answer: {question.Answer}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Difficulty Level: {question.DifficultyLevel}
                                    </Typography>
                                    <Box mt={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleEditQuestion(question.id)}
                                            style={{ marginRight: '8px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDeleteQuestion(question.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {currentTab === 1 && (
                <Box my={4} className={classes.categoryList}>
                    {categories.map((category) => (
                        <div key={category} className={classes.categoryItem}>
                            <Typography variant="body1">{category}</Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDeleteCategory(category)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </Box>
            )}

            <Box mt={4}>
                {currentTab === 0 && (
                    <Button variant="contained" color="primary" onClick={handleAddQuestion}>
                        Add Question
                    </Button>
                )}
                {currentTab === 1 && (
                    <Button variant="contained" color="primary" onClick={handleAddCategory}>
                        Add Category
                    </Button>
                )}
            </Box>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} className={classes.editDialog}>
                <DialogTitle>Edit Question</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Question"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                    />
                    <TextField
                        label="Option A"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedOptions.OptionA}
                        onChange={(e) => setEditedOptions({ ...editedOptions, OptionA: e.target.value })}
                    />
                    <TextField
                        label="Option B"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedOptions.OptionB}
                        onChange={(e) => setEditedOptions({ ...editedOptions, OptionB: e.target.value })}
                    />
                    <TextField
                        label="Option C"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedOptions.OptionC}
                        onChange={(e) => setEditedOptions({ ...editedOptions, OptionC: e.target.value })}
                    />
                    <TextField
                        label="Option D"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedOptions.OptionD}
                        onChange={(e) => setEditedOptions({ ...editedOptions, OptionD: e.target.value })}
                    />
                    <div className={classes.dropdownContainer}>
                        <Typography variant="body1">Difficulty Level</Typography>
                    <Select
                        label="Difficulty Level"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedOptions.DifficultyLevel}
                        onChange={(e) => setEditedOptions({ ...editedOptions, DifficultyLevel: e.target.value })}
                    >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="difficult">Difficult</MenuItem>
                    </Select>
                        </div>
                    <TextField
                        label="Answer"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedOptions.Answer}
                        onChange={(e) => setEditedOptions({ ...editedOptions, Answer: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEditedQuestion} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} className={classes.editDialog}>
                <DialogTitle>Add Question</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Question"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newQuestion.question}
                        onChange={(e) => handleNewQuestionChange('question', e.target.value)}
                    />
                    <TextField
                        label="Option A"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newQuestion.optionA}
                        onChange={(e) => handleNewQuestionChange('optionA', e.target.value)}
                    />
                    <TextField
                        label="Option B"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newQuestion.optionB}
                        onChange={(e) => handleNewQuestionChange('optionB', e.target.value)}
                    />
                    <TextField
                        label="Option C"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newQuestion.optionC}
                        onChange={(e) => handleNewQuestionChange('optionC', e.target.value)}
                    />
                    <TextField
                        label="Option D"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newQuestion.optionD}
                        onChange={(e) => handleNewQuestionChange('optionD', e.target.value)}
                    />
                    <TextField
                        label="Answer"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newQuestion.answer}
                        onChange={(e) => handleNewQuestionChange('answer', e.target.value)}
                    />
                    <div className={classes.dropdownContainer}>
                        <Typography variant="body1">Difficulty Level</Typography>
                    <Select
                        label="Difficulty Level"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newQuestion.difficultyLevel}
                        onChange={(e) => handleNewQuestionChange('difficultyLevel', e.target.value)}
                    >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="difficult">Difficult</MenuItem>
                    </Select>
                    </div>

                    <div className={classes.dropdownContainer}>
                        <Typography variant="body1">Category</Typography>
                        <Select
                            label="Category"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newQuestion.category}
                            onChange={(e) => handleNewQuestionChange('category', e.target.value)}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                        <br />
                        <div>
                            <Typography style={{ color: 'red' }}>
                                If the category you want to add does not exist, you can go to the Category Management Tab and add the category.
                            </Typography>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveNewQuestion} color="primary">
                        Save Question
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog} className={classes.editDialog}>
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddCategoryDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveNewCategory} color="primary">
                        Save Category
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default QuestionManagementPage;
