const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const psn = require('psn-api');
dotenv.config();

router.get('/user_titles', async (req, res) => {
  const now = new Date();
  // let accessToken;
  const accessCode = await psn.exchangeNpssoForCode(process.env.PSN_PASS);
  const accessToken = await psn.exchangeCodeForAccessToken(accessCode);

  const expirationDate = new Date(
    now.getTime() + accessToken.expiresIn * 1000
  ).toISOString();

  const isAccessTokenExpired =
    new Date(expirationDate).getTime() < now.getTime();
  // If PSN token expired, refresh token to omit nppso process
  if (isAccessTokenExpired) {
    const newAuthTokens = await psn.exchangeRefreshTokenForAuthTokens(
      accessToken.refreshToken
    );
  }
  try {
    const finalTrophyData = [];

    const generateTrophyData = async (ids) => {
      await Promise.all(
        ids.map(async (game, i) => {
          const trophyItem = await psn.getTitleTrophies(
            { accessToken: accessToken.accessToken },
            // 'me',
            game,
            'all',
            { npServiceName: 'trophy' }
          );
          finalTrophyData[i].allTrophies = trophyItem.trophies;
        })
      );

      await Promise.all(
        ids.map(async (game, i) => {
          const trophyDataItem = await psn.getUserTrophiesEarnedForTitle(
            { accessToken: accessToken.accessToken },
            'me',
            game,
            'all',
            { npServiceName: 'trophy' }
          );
          finalTrophyData[i].earnedTrophies = trophyDataItem.trophies;
        })
      );
    };

    const generateUserTitles = async () => {
      const titleIds = [];
      const response = await psn.getUserTitles(
        { accessToken: accessToken.accessToken },
        'me',
        {
          limit: 500,
        }
      );

      for (let item of response.trophyTitles) {
        titleIds.push(item.npCommunicationId);
        finalTrophyData.push({
          name: item.trophyTitleName.replace(/®|™/g, ''),
          imageURL: item.trophyTitleIconUrl,
        });
      }
      return await generateTrophyData(titleIds);
    };
    await generateUserTitles();
    res.send(finalTrophyData);
  } catch (error) {
    res.send(error);
    return;
  }
});
module.exports = router;
