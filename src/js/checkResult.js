export const countWinningNumber = (ticketNumber, winningNumber) => ticketNumber.filter((number) => winningNumber.includes(number)).length;
