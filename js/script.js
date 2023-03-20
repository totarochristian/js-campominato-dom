/*
------------------------------------------------------------------------------
-------------------------------- Main goals ----------------------------------
------------------------------------------------------------------------------
- The user clicks on a button which will generate a square game grid.
- Each cell has a progressive number, from 1 to 100.
- There will then be 10 boxes for each of the 10 rows.
- When the user clicks on each cell, the clicked cell turns blue and I issue 
  a message in the console with the number of the clicked cell.
------------------------------------------------------------------------------
---------------------------------- Bonus -------------------------------------
------------------------------------------------------------------------------
Add a select next to the build button, which provides a choice of three 
different difficulty levels:
- with difficulty 1 => 100 boxes, with a number between 1 and 100, divided 
  into 10 boxes by 10 lines;
- with difficulty 2 => 81 boxes, with a number between 1 and 81, divided 
  into 9 boxes for 9 lines;
- with difficulty 3 => 49 boxes, with a number between 1 and 49, divided 
  into 7 boxes for 7 rows;
------------------------------------------------------------------------------
----------------------------------- Tips -------------------------------------
------------------------------------------------------------------------------
First we write down what we want to do step by step in Italian, we divide the work into micro problems.
For example:
- What do I need to generate the numbers?
- We always try console.log() first to see if we're getting the right data.
- Validations and checks can also be done at a later time.
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
*/

document.getElementById("choseMode").addEventListener("click",BtnPlayClicked);
