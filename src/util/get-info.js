'use strict'

function getInfo (queryInput, infoKey) {
  const extractedInfo = []
  const queryInputArray = Object.entries({ ...queryInput })

  for (let i = 0; i < infoKey.length; i++) {
    const infoKeyRegx = new RegExp(infoKey[i])
    const replacement = infoKey[i].split('_')[1]
    queryInputArray.map((q) => {
      return q[0].match(infoKeyRegx) && extractedInfo.push([q[0].replace(infoKeyRegx, replacement), q[1]])
    })
  }
  return extractedInfo
}

module.exports = getInfo
