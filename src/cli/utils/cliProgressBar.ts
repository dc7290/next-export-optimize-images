import colors from 'ansi-colors'
import cliProgress from 'cli-progress'

const bar = new cliProgress.SingleBar({
  format: `Optimization progress |${colors.cyan('{bar}')}| {percentage}% || {value}/{total} Chunks`,
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
  stopOnComplete: true,
})

export const cliProgressBarStart = (total: number) => {
  bar.start(total, 0)
}

export const cliProgressBarIncrement = (addNumber?: number) => {
  bar.increment(addNumber)
}
