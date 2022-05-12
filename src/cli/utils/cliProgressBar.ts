import colors from 'ansi-colors'
import cliProgress from 'cli-progress'

const bar = new cliProgress.SingleBar({
  format: `Optimization progress |${colors.cyan('{bar}')}| {percentage}% || {value}/{total} Chunks || Speed: {speed}`,
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
})

export const cliProgressBarStart = (total: number) => {
  bar.start(total, 0)
}

export const cliProgressBarIncrement = (addNumber?: number) => {
  bar.increment(addNumber)
}

export const cliProgressBarStop = () => {
  bar.stop()
}
