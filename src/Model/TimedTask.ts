export default class TimedTask {
  startTimer = (timeout: number, finishTask: () => void): void => {
    setTimeout(() => {
      finishTask();
    }, timeout);
  };
}
