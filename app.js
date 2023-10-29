require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require('path');
const port = process.env.PORT || 3000;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.get('/viking', async (req, res) => {
  // Make the API call
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a skilled storyteller spinning tales of the Viking Era, specializing in alternate histories. Imagine the user as a notable Viking leader—Leif Erikson, Ragnar Lothbrok, Erik the Red, Ivar the Boneless, or Cnut the Great. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Enslave the Native Americans] or [Peacefully negotiate with them]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

  }],  
    max_tokens: 3800,
    temperature: 0.6,
  });

  console.log(response.data.choices[0].message.content);

  // Extract the scenario from the API response
  const scenario = response.data.choices[0].message.content;
  
  res.render('playgame', { 
    title: 'Viking Era', 
    scenario: scenario,
    initialHistory: JSON.stringify([
      {
        role: "system",
        content: "You are a skilled storyteller spinning tales of the Viking Era, specializing in alternate histories. Imagine the user as a notable Viking leader—Leif Erikson, Ragnar Lothbrok, Erik the Red, Ivar the Boneless, or Cnut the Great. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Enslave the Native Americans] or [Peacefully negotiate with them]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

      },
      {
        role: "assistant",
        content: scenario
      }
    ])
  });
});

app.get('/american_revolution', async (req, res) => {
  // Make the API call
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a skilled storyteller spinning tales of the American Revolution, specializing in alternate histories. Imagine the user as a notable American revolutionary leader — George Washington, James Madison, Thomas Jefferson, Benjamin Franklin, or John Adams. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Declare Independence] or [Peacefully negotiate with the British]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

  }],  
    max_tokens: 3800,
    temperature: 0.6,
  });

  // Extract the scenario from the API response
  const scenario = response.data.choices[0].message.content;
  
  res.render('playgame', { 
    title: 'American Revolution', 
    scenario: scenario,
    initialHistory: JSON.stringify([
      {
        role: "system",
        content: "You are a skilled storyteller spinning tales of the American Revolution, specializing in alternate histories. Imagine the user as a notable American revolutionary leader — George Washington, James Madison, Thomas Jefferson, Benjamin Franklin, or John Adams. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Declare Independence] or [Peacefully negotiate with the British]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

      },
      {
        role: "assistant",
        content: scenario
      }
    ])
  });
});

app.get('/civil_war', async (req, res) => {
  // Make the API call
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a skilled storyteller spinning tales of the US Civil War, specializing in alternate histories. Imagine the user as a notable US Civil War leader — Abraham Lincoln, Robert Lee, Jefferson Davis, Ulysses S. Grant, or William Sherman. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Let the South keep their slaves] or [Issue the Emancipation Proclamation]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

  }],  
    max_tokens: 3800,
    temperature: 0.6,
  });

  // Extract the scenario from the API response
  const scenario = response.data.choices[0].message.content;
  
  res.render('playgame', { 
    title: 'US Civil War', 
    scenario: scenario,
    initialHistory: JSON.stringify([
      {
        role: "system",
        content: "You are a skilled storyteller spinning tales of the US Civil War, specializing in alternate histories. Imagine the user as a notable US Civil War leader — Abraham Lincoln, Robert Lee, Jefferson Davis, Ulysses S. Grant, or William Sherman. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Let the South keep their slaves] or [Issue the Emancipation Proclamation]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

      },
      {
        role: "assistant",
        content: scenario
      }
    ])
  });
});

app.get('/wwi', async (req, res) => {
  // Make the API call
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a skilled storyteller spinning tales of World War 1, specializing in alternate histories. Imagine the user as a notable World War 1 leader — Woodrow Wilson, Kaiser Wilhelm, Czar Nicholas, Vladimir Lenin, or Franz Joseph. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Sink the Lusitania ship] or [Choose not to sink the Lusitania ship in fear of the United States]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

  }],  
    max_tokens: 3800,
    temperature: 0.6,
  });

  // Extract the scenario from the API response
  const scenario = response.data.choices[0].message.content;
  
  res.render('playgame', { 
    title: 'World War I', 
    scenario: scenario,
    initialHistory: JSON.stringify([
      {
        role: "system",
        content: "You are a skilled storyteller spinning tales of World War 1, specializing in alternate histories. Imagine the user as a notable World War 1 leader — Woodrow Wilson, Kaiser Wilhelm, Czar Nicholas, Vladimir Lenin, or Franz Joseph. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Sink the Lusitania ship] or [Choose not to sink the Lusitania ship in fear of the United States]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

      },
      {
        role: "assistant",
        content: scenario
      }
    ])
  });
});

app.get('/wwii', async (req, res) => {
  // Make the API call
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a skilled storyteller spinning tales of World War 2, specializing in alternate histories. Imagine the user as a notable World War 2 leader — Adolf Hitler, Franklin D. Roosevelt, Joseph Stalin, Winston Churchill, or Benito Mussolini. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Drop Hiroshima and Nagasaki] or [Try to peacefully negotiate with Japan]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

  }],  
    max_tokens: 3800,
    temperature: 0.6,
  });

  // Extract the scenario from the API response
  const scenario = response.data.choices[0].message.content;
  
  res.render('playgame', { 
    title: 'World War II', 
    scenario: scenario,
    initialHistory: JSON.stringify([
      {
        role: "system",
        content: "You are a skilled storyteller spinning tales of World War 2, specializing in alternate histories. Imagine the user as a notable World War 2 leader — Adolf Hitler, Franklin D. Roosevelt, Joseph Stalin, Winston Churchill, or Benito Mussolini. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Drop Hiroshima and Nagasaki] or [Try to peacefully negotiate with Japan]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

      },
      {
        role: "assistant",
        content: scenario
      }
    ])
  });
});

app.get('/cold_war', async (req, res) => {
  // Make the API call
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a skilled storyteller spinning tales of the Cold War, specializing in alternate histories. Imagine the user as a notable Cold War leader — Dwight Eisenhower, John F. Kennedy, Lyndon B. Johnson, Joseph Stalin, Ronald Reagan, or Mikhail Gorbachev. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Nuke the Soviet Union] or [Try to reach a compromise with the Soviet Union]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

  }],  
    max_tokens: 3800,
    temperature: 0.6,
  });

  // Extract the scenario from the API response
  const scenario = response.data.choices[0].message.content;
  
  res.render('playgame', { 
    title: 'Cold War', 
    scenario: scenario,
    initialHistory: JSON.stringify([
      {
        role: "system",
        content: "You are a skilled storyteller spinning tales of the Cold War, specializing in alternate histories. Imagine the user as a notable Cold War leader — Dwight Eisenhower, John F. Kennedy, Lyndon B. Johnson, Joseph Stalin, Ronald Reagan, or Mikhail Gorbachev. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Nuke the Soviet Union] or [Try to reach a compromise with the Soviet Union]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

      },
      {
        role: "assistant",
        content: scenario
      }
    ])
  });
});

app.get('/mru_classroom', async (req, res) => {
  // Make the API call
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a skilled storyteller, guiding the user through life in Mr. U's AP United States History classroom. Consider the user as a student learning from Mr. U, a witty, youthful teacher who poses AP US History questions. Weave classroom drama into your narrative, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for the student's answer, enclosed in brackets. For example: [The US Declared Independence in 1776] or [The United States is still under British control]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

  }],  
    max_tokens: 3800,
    temperature: 0.6,
  });

  // Extract the scenario from the API response
  const scenario = response.data.choices[0].message.content;
  
  res.render('playgame', { 
    title: `Mr U's Classroom`, 
    scenario: scenario,
    initialHistory: JSON.stringify([
      {
        role: "system",
        content: "You are a skilled storyteller, guiding the user through life in Mr. U's AP United States History classroom. Consider the user as a student learning from Mr. U, a witty, youthful teacher who poses AP US History questions. Weave classroom drama into your narrative, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for the student's answer, enclosed in brackets. For example: [The US Declared Independence in 1776] or [The United States is still under British control]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS."

      },
      {
        role: "assistant",
        content: scenario
      }
    ])
  });
});

app.post('/custom', async (req, res) => {
  // Make the API call
  let customScenario = req.body.customScenario;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a skilled storyteller specializing in alternate histories that a user has entered into a ‘custom scenario’ box. Imagine the user as a notable leader in their desired historical event. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Nuke the Soviet Union] or [Try to reach a compromise with the Soviet Union]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS. Here is the custom historical scenario that the user has entered: " + customScenario

  }],  
    max_tokens: 3800,
    temperature: 0.6,
  });

  // Extract the scenario from the API response
  const scenario = response.data.choices[0].message.content;
  
  res.render('playgame', { 
    title: 'Custom History', 
    scenario: scenario,
    initialHistory: JSON.stringify([
      {
        role: "system",
        content: "You are a skilled storyteller specializing in alternate histories that a user has entered into a ‘custom scenario’ box. Imagine the user as a notable leader in their desired historical event. Weave into your story important historical events, agreements, and battles, addressing the user directly with 'You'. Keep your response under 200 words, leaving the narrative open for continuation. Close each passage by presenting exactly two choices (make sure you always output 2 choices) for future actions, marked with brackets. For example: [Nuke the Soviet Union] or [Try to reach a compromise with the Soviet Union]. Once these options are provided, ALWAYS STOP and finish your response. Do not continue the story. When the user selects a path, commence your next passage with 'You have chosen: ', followed by the chosen option. You must be absolutely sure to write the chosen option without any brackets, as brackets could disrupt the flow of the narrative and the user's code. NO BRACKETS. Here is the custom historical scenario that the user has entered: " + customScenario

      },
      {
        role: "assistant",
        content: scenario
      }
    ])
  });
});
  

 app.post('/api/continue_story', async (req, res) => {
  // Extract the choice from the request body
  const { choice, history } = req.body;

  // Continue the conversation with the choice
  const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...history,
        {
            role: "user",
            content: choice
        }
      ],
      max_tokens: 500,
      temperature: 0.6,
  });
  
  console.log(history);
  console.log(response.data.choices[0].message.content);

  // Extract the next part of the story from the API response
  const nextPartOfStory = response.data.choices[0].message.content;

  // Send the response back to the client
  res.json(nextPartOfStory);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
