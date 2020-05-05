const { describe, it } = require('mocha')
const { expect } = require('chai')
const { msToTime } = require('../../src/utility/timetostring')

describe('TimeToString', () => {
  it('should convert MS to human readable', () => {
    expect(msToTime(0)).to.equal('00:00:00.000')
    expect(msToTime(1)).to.equal('00:00:00.001')
    expect(msToTime(100)).to.equal('00:00:00.100')
    expect(msToTime(1000)).to.equal('00:00:01.000')
    expect(msToTime(60000)).to.equal('00:01:00.000')
    expect(msToTime(3600000)).to.equal('01:00:00.000')
    expect(msToTime(36000000)).to.equal('10:00:00.000')
    expect(msToTime(360000000)).to.equal('100:00:00.000')
    expect(msToTime(3600000000)).to.equal('1000:00:00.000')
  })
})
