import mongoose from "mongoose"
import ShelfItems from "./shelfItems.js"
import NFTItems from "./nftItemModel.js"

const deploymentInfo = {
  wallet: "EQAyMah6BUuxR7D8HXt3hr0r2kbUgZ_kCOigjRnQj402W1v8",
  imagesIpfsHash: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/",
  metadataIpfsHash:
    "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/",
  lastProcessedNftIndex: 2006,
  currentItemIndex: 32,
  collection: {
    address: "EQC_P7y0BA0VyIry1Vn3vxW5QFwL4eRP2KOTvnMAYNraTzBa",
    royaltyPercent: 0.05,
    royaltyAddress: "EQAyMah6BUuxR7D8HXt3hr0r2kbUgZ_kCOigjRnQj402W1v8",
    collectionContentUrl:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/collection.json",
    commonContentUrl:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/",
  },
  marketplace: {
    address: "EQDFLf7hqWycGlu1HImKjJ-ypTXgPJplsDhjeDk3qf8xKrs_",
  },
  nftItems: [
    {
      metadataFile: "0.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 0,
          address: "EQB4rsue9YmdRc_QdR6b2dci23iWPmNEol4in4ncSSraBtFZ",
          deploymentStatus: "completed",
        },
        {
          index: 1,
          address: "EQCE5To2RmZzN3lA4-cqJBQycw5blXQUnHh1fdbriHrcrlN5",
          deploymentStatus: "completed",
        },
        {
          index: 2,
          address: "EQBzQOD7tlR4FS9thl_zH2e4R2X2NBo3LGv7JqxM8U2AUbqT",
          deploymentStatus: "completed",
        },
        {
          index: 3,
          address: "EQAMqaU6mW4EuTB-IDTVTbCOWqLtBN8F4AU3z06gUO1VhbcH",
          deploymentStatus: "completed",
        },
        {
          index: 4,
          address: "EQBhnoMva4KgDEFzRfZ2X6RZDbHJPI855GaO5499ubPE6xl3",
          deploymentStatus: "completed",
        },
        {
          index: 5,
          address: "EQAfmn4RcIrwm5-IbYI0xZHIqMlgmb0XQ9JVoAfZUmxSJJ-V",
          deploymentStatus: "completed",
        },
        {
          index: 6,
          address: "EQBrl_HPnvxF9ipqC1ow6motUdL-vJrxBf-B9xecpf7gkTrk",
          deploymentStatus: "completed",
        },
        {
          index: 7,
          address: "EQBvCCWNWPBoLwtLznPEGLwYUSqXHqwZxzpv9ucZ7OjeuiG0",
          deploymentStatus: "completed",
        },
        {
          index: 8,
          address: "EQBCXfbTLvrOLmSorDSqMxuDxb_AkQ9eEMs6r900ml9-baBg",
          deploymentStatus: "completed",
        },
        {
          index: 9,
          address: "EQDs2PtGEOWE-YZok7WJPm6aHt7ChcOts_5D4AwYeoMPr1n8",
          deploymentStatus: "completed",
        },
        {
          index: 10,
          address: "EQCix3BhkQDao2T8C6WQwaGscyiYd36XYdBWXkSgmkiGf64H",
          deploymentStatus: "completed",
        },
        {
          index: 11,
          address: "EQD9RrTnL1kQaGvhEJ5V8pfQf2K4Ozs_uzQXU9EHvTSArcRK",
          deploymentStatus: "completed",
        },
        {
          index: 12,
          address: "EQD9x7BlAOyTWJEfw_Lzsr9mgfklJhp3SWX2OU5rQks67I3T",
          deploymentStatus: "completed",
        },
        {
          index: 13,
          address: "EQDHAkm5B8FfrB6aYirwI_kvbsXpIFkmzzgHXe7MINEb6b0f",
          deploymentStatus: "completed",
        },
        {
          index: 14,
          address: "EQCa7XrTeaeTFiIlWpGPbHbH4gwpfdBKNBYjeZLoQgwoK0Xp",
          deploymentStatus: "completed",
        },
        {
          index: 15,
          address: "EQAm3jsuguE2gSuOvgKACr_fyDHl5j2tt9AB1cTtox7lFXtW",
          deploymentStatus: "completed",
        },
        {
          index: 16,
          address: "EQCSczhtDiP7S9vZMbO_JOELjxT5MIB_5Mt7FYakCTfwzcb9",
          deploymentStatus: "completed",
        },
        {
          index: 17,
          address: "EQC_W3L8epsAmGr6cW_EqrG398SpSlda77bO_hFHZ_bnhzYE",
          deploymentStatus: "completed",
        },
        {
          index: 18,
          address: "EQB7PkZuYsX4tfXE4PISCeLXJ12k2F980OEvs8MRJ-XXE1Zi",
          deploymentStatus: "completed",
        },
        {
          index: 19,
          address: "EQCaL1H3xB61cbs0EGCb26BV6NAzw3mR0Z52_5aK2U0tv7VK",
          deploymentStatus: "completed",
        },
        {
          index: 20,
          address: "EQB3eJEOWcxT3RG15MDmYIukjjg0ZGZz7gm9dRRXTh90F7fw",
          deploymentStatus: "completed",
        },
        {
          index: 21,
          address: "EQBsP_Ej9G5a5a5mjC156pi51izaTFlsZg3zq4zMVCCNLVu5",
          deploymentStatus: "completed",
        },
        {
          index: 22,
          address: "EQDjD0V2MqwvqF8ERL5L_Qz0XnogyUrFYPmyPpQM0JGffiAr",
          deploymentStatus: "completed",
        },
        {
          index: 23,
          address: "EQB4k80DL4thMtGckRDDfGfEzy-Pw16kIgL5ShnkSPG83xlm",
          deploymentStatus: "completed",
        },
        {
          index: 24,
          address: "EQAKVGdibikhxoVb3yr7F6czfZtbo5CZtq0cIotraBOlDqUd",
          deploymentStatus: "completed",
        },
        {
          index: 25,
          address: "EQCf38X5ib_gnCLJv8iR0OG-bTcNKAZ1EHt3rrnDFkdd-FDA",
          deploymentStatus: "completed",
        },
        {
          index: 26,
          address: "EQC71Yvsks5rsxeqLuQzEUUXWv6LCUumRxMa1jIUyLVINqEs",
          deploymentStatus: "completed",
        },
        {
          index: 27,
          address: "EQCo44FizZ5d2dUeyP76LI59xQzn7TVu3keeLhToiKUWq462",
          deploymentStatus: "completed",
        },
        {
          index: 28,
          address: "EQC7YJej68dZT6ToMLB6btBmTUHcYU1Q9VWPqhuh9xsuR0Qf",
          deploymentStatus: "completed",
        },
        {
          index: 29,
          address: "EQAcJu5tg7IjPBA26cE68bayXPOi8xa0PiwO-aZhNr-xlQBo",
          deploymentStatus: "completed",
        },
        {
          index: 30,
          address: "EQD54pF8Bryovs_i9K4TOx6TDGYS0hm7aoSJegG-tjT64hej",
          deploymentStatus: "completed",
        },
        {
          index: 31,
          address: "EQC8dWwbfz37wgzgo0721A0WTConMrigoZZ9g4l8ldL-aOO6",
          deploymentStatus: "completed",
        },
        {
          index: 32,
          address: "EQDAdxaeMDuZ719tR0mArQDcr3S3xxW6IJEqI_IgGAaZpyjs",
          deploymentStatus: "completed",
        },
        {
          index: 33,
          address: "EQDXk8iyINUQnuFJqIsiQ4DI9Ppsfi3ptlOU0lhx2oyxqafn",
          deploymentStatus: "completed",
        },
        {
          index: 34,
          address: "EQARgGKOY407MSf0QK-B1in9Hjoai9l2o8l_53ZFV66JAnE7",
          deploymentStatus: "completed",
        },
        {
          index: 35,
          address: "EQBWZhOcvaFQKbHvfFur0irfmmXl5Xjh9uDNzBtPd7GeOowP",
          deploymentStatus: "completed",
        },
        {
          index: 36,
          address: "EQD0wuFUREozIWRBasSs3kALFmU15TsNy1dE7qZKv0--Ncwp",
          deploymentStatus: "completed",
        },
        {
          index: 37,
          address: "EQC3nK0Knmh9r1FxOTewvxJeKxkt6ZX1sbnOUVxNMi1q-CcE",
          deploymentStatus: "completed",
        },
        {
          index: 38,
          address: "EQCb57vqM1iek5AtevVctAzkMzVZW7ah2hSgfTVQjnLTyK2T",
          deploymentStatus: "completed",
        },
        {
          index: 39,
          address: "EQBe723O5RCCPusxunvJsbCLB-E3cwGoJW7lpfQRoQY3LobU",
          deploymentStatus: "completed",
        },
        {
          index: 40,
          address: "EQAe4zZqABN0gmxWFcGq2jLtAqkPwfybyQWx8cYUkZk332Ky",
          deploymentStatus: "completed",
        },
        {
          index: 41,
          address: "EQDL1LyuuHr7kPX3ya2TlgqeGIXem2TPV_VarMiTpDa-U_0v",
          deploymentStatus: "completed",
        },
        {
          index: 42,
          address: "EQD3O7Bb_tA0Do9JCNrx_GveK1YLyy50NzxTxJs53Mk8Cwwc",
          deploymentStatus: "completed",
        },
        {
          index: 43,
          address: "EQBFmtIvzqCIfAqfDv0y3Z1XN86p4IXY1wg8B7S2pSw93GRg",
          deploymentStatus: "completed",
        },
        {
          index: 44,
          address: "EQDv51v4gx3a3a-CgDC8f5BK_mn5pNFbW0HUEJ2usanz6DxE",
          deploymentStatus: "completed",
        },
        {
          index: 45,
          address: "EQAPruPWo0stCGtyt8xB_NLL7VeDPlSw5ZUYc_T5ejT5a7F1",
          deploymentStatus: "completed",
        },
        {
          index: 46,
          address: "EQCUpOAU2WXV9xI0OcqVxxq6tuOrcj5GXHvs7UgwSd9xYxzg",
          deploymentStatus: "completed",
        },
        {
          index: 47,
          address: "EQBrD0WT4tDJzF2QXovB0ztbLQnpFnI_E9-556tuVdghRw81",
          deploymentStatus: "completed",
        },
        {
          index: 48,
          address: "EQC2sg05tXk-YaZr6GpFNTEJWTRauDHV-3Uvmq9XwxH9Bfq6",
          deploymentStatus: "completed",
        },
        {
          index: 49,
          address: "EQCl_wMFwVTp1gL0eWjETqjDoEIfzowObMsJRbXhA9OV2yJT",
          deploymentStatus: "completed",
        },
        {
          index: 50,
          address: "EQCFuGBNzUBebJKXUtocofzjQ4xIR2Gpe0jZesW5OQUKsV0G",
          deploymentStatus: "completed",
        },
        {
          index: 51,
          address: "EQBJPnKoq2KSp-eYe8ewEZYPFnH8X5eSFwtrsnUwnGV8wYzm",
          deploymentStatus: "completed",
        },
        {
          index: 52,
          address: "EQDphbktw6JRz3YgAtTW-C2rlECcSpoy-5wv-ssxiQFghCfE",
          deploymentStatus: "completed",
        },
        {
          index: 53,
          address: "EQDx_45atIiKc4uVylq2L6h65K9anIHSiYGepLcVz4q_pRde",
          deploymentStatus: "completed",
        },
        {
          index: 54,
          address: "EQD5Zmmq1Zw4CLzZgsSPn5M6gDS_ejC2lFGldg6TO6Z7iLr8",
          deploymentStatus: "completed",
        },
        {
          index: 55,
          address: "EQCA7_TJBTnoOWizQ8mH9bzxDHR837rlRQoR1YyababTZdH9",
          deploymentStatus: "completed",
        },
        {
          index: 56,
          address: "EQC4XzMYAIf8dKlHqR-ez0n4W5hqwRrND6LRGjiDATvt_mVy",
          deploymentStatus: "completed",
        },
        {
          index: 57,
          address: "EQBr2XYyPvr5OLeMgrqB0TFFZZmG5yXkmyMwIfpMTTeLnYdP",
          deploymentStatus: "completed",
        },
        {
          index: 58,
          address: "EQCNVyeIYOzJekXYo0XqMMnPTrkTOSX3zGFWy5S6XglOwSnx",
          deploymentStatus: "completed",
        },
        {
          index: 59,
          address: "EQDM_amm-se2BtRRcFMPptD03KI0fk7qPvl_ti8Quj7w1hho",
          deploymentStatus: "completed",
        },
        {
          index: 60,
          address: "EQBISPiNJTgX66OKtbatl_DuoZK_E9mVDX8RMLvtanwUJ8qC",
          deploymentStatus: "completed",
        },
        {
          index: 61,
          address: "EQCaosJotYaa3rOflLm88--uY2FwYp6mSI0qpB2DYMJJOMW1",
          deploymentStatus: "completed",
        },
        {
          index: 62,
          address: "EQAFokT60wn50kr0V3W0EEuUmooiEfGS0hwW_CvwDG28wGvi",
          deploymentStatus: "completed",
        },
        {
          index: 63,
          address: "EQBS9hyMRdi5p-wgJQUe_BPOOfaw8B9hllDH7zOW935avgI2",
          deploymentStatus: "completed",
        },
        {
          index: 64,
          address: "EQAu7Ub39inCbWFB-2rY17wFCJ9in7ex_px1iART3IG8MRad",
          deploymentStatus: "completed",
        },
        {
          index: 65,
          address: "EQDrkePNFVbnToQ-7a-irBtNM4kup4fQATEtQ0gEjA2T5OwX",
          deploymentStatus: "completed",
        },
        {
          index: 66,
          address: "EQDAO21XXdgGRNwDc1C_DeWcjakdJZkmOz9f210vkE7Z1ARx",
          deploymentStatus: "completed",
        },
        {
          index: 67,
          address: "EQAw8gzcivbalb9YswQ9boRuFuiLjFtNzaLtYEC7As-cZ5ws",
          deploymentStatus: "completed",
        },
        {
          index: 68,
          address: "EQAuGbuiMpXnXwZ4FoTbbh7XHM9HOqoAkdm9scP-kvNxSxeL",
          deploymentStatus: "completed",
        },
        {
          index: 69,
          address: "EQDOxelTJUVjL21qvpT3NsJPyaLgRBex0S1_YGh_84Y9Y2eO",
          deploymentStatus: "completed",
        },
        {
          index: 70,
          address: "EQCasspYBuy_ynxoNS0e3eQtIg_3ZZvlOCm0IlMdEB2pHNJv",
          deploymentStatus: "completed",
        },
        {
          index: 71,
          address: "EQD5-GmZNTknb8Ydy5Ja55eMarh5YKVHI4jRQkZDe-SzUakm",
          deploymentStatus: "completed",
        },
        {
          index: 72,
          address: "EQCR1ExFUuoCx58o-DRkqMnFN3fMDg2f9lDqbPxHMMu7vnI2",
          deploymentStatus: "completed",
        },
        {
          index: 73,
          address: "EQAXDnvHNy93kQcN_ITy6qxU3mSTIomxFAC0Jky216Tk6y9k",
          deploymentStatus: "completed",
        },
        {
          index: 74,
          address: "EQD8nFKhfMkpB5OzwgPtkBjRZU-Ti9gnEIoS5u1qbEU3rGao",
          deploymentStatus: "completed",
        },
        {
          index: 75,
          address: "EQBEprUzgRmZpIrYvNnbU0oYqsMBMmjPOeu-rSqSJw_GYo6C",
          deploymentStatus: "completed",
        },
        {
          index: 76,
          address: "EQC4kFNORmHbTZgIKWme3r6uiJ9M8U1TTO4s-VLfM9S0SMWY",
          deploymentStatus: "completed",
        },
        {
          index: 77,
          address: "EQAtSHHbwOEDPJKfSOcHBJ0dHyJJuxv-IOWo1y7-HIvG6iVH",
          deploymentStatus: "completed",
        },
        {
          index: 78,
          address: "EQC7AoD5UIUPt1kYqSLlS4kKyw4UlQ2-G0iez6CYnVXr1rWX",
          deploymentStatus: "pending",
        },
        {
          index: 78,
          address: "EQC7AoD5UIUPt1kYqSLlS4kKyw4UlQ2-G0iez6CYnVXr1rWX",
          deploymentStatus: "completed",
        },
        {
          index: 79,
          address: "EQAgW5T2KjtYcotRvrhFcZQK0uICYUlPRzkiJUivy7qkSXqU",
          deploymentStatus: "completed",
        },
        {
          index: 80,
          address: "EQA37o7Z5VRTuEt4AnoVMSvtrnfLAd-Ce1QDu_TQceaDXIU2",
          deploymentStatus: "completed",
        },
        {
          index: 81,
          address: "EQDUDDxMtzW6C9Rn-VKnsUWwmsExr69g6TAg7OM1IpcMuJGv",
          deploymentStatus: "completed",
        },
        {
          index: 82,
          address: "EQC6dCqKiM7SMo7jGqCYlb_UoxeoLblnRvu2tYWK9oo0hT4U",
          deploymentStatus: "completed",
        },
        {
          index: 83,
          address: "EQBazoT0wC_7DyLZTERnEyLQN8c0NiQZVK6DNkQoCjeScHVv",
          deploymentStatus: "completed",
        },
        {
          index: 84,
          address: "EQA-0eP6LPOHZIf0UxQQbdW7i_G1DBKio_DTAADijYwhcAOW",
          deploymentStatus: "completed",
        },
        {
          index: 85,
          address: "EQCf8U_tJVFf1G3Wa-UhLB832Kl83SeyCPuDItCw3P-7U-xR",
          deploymentStatus: "completed",
        },
        {
          index: 86,
          address: "EQDZcNRdX_KUTWgdHUuUZie3KuQjADRhxGurydGig6Azvu4h",
          deploymentStatus: "completed",
        },
        {
          index: 87,
          address: "EQCjtGPRQO098nNR8MNJ41A9ny-6Mc4EVKDaBU0bxMuL8WM8",
          deploymentStatus: "completed",
        },
        {
          index: 88,
          address: "EQDCcanFkcD83vWHG9sfrqzIChMOtYNeaLTMjB_YCoVOYtG1",
          deploymentStatus: "completed",
        },
        {
          index: 89,
          address: "EQDaxt57n605tHLFR6Tc9ov-xg-rtY-5to_6NsWm-i_vTUQ-",
          deploymentStatus: "completed",
        },
        {
          index: 90,
          address: "EQBFE9_8aGcpzO2cDgRo7fSr2-DWNeQZeqSsWqQ8xFgSkJIU",
          deploymentStatus: "completed",
        },
        {
          index: 91,
          address: "EQABj45WDwbUjLhoLMGf201EbfqzVXHJ2n8OffjKL-tYDU8A",
          deploymentStatus: "completed",
        },
        {
          index: 92,
          address: "EQCek43K2cDz18U5mMIUXcIZv8Tssyzxt_47ETJO65Qf3eWD",
          deploymentStatus: "completed",
        },
        {
          index: 93,
          address: "EQAe4if15wZ4-jsKiph9OvIIVgWYUf4g6HGCIhcaSMNAqDzA",
          deploymentStatus: "completed",
        },
        {
          index: 94,
          address: "EQAoowSqq3zIieweGjiJPDWqczNqzO3zNm1-lRp3yyKdZ_XW",
          deploymentStatus: "completed",
        },
        {
          index: 95,
          address: "EQAA7-yuzCQFMEIUZOT98Tldfz1r0jaLBNHQBsOQ3hR7ekJ1",
          deploymentStatus: "completed",
        },
        {
          index: 96,
          address: "EQD5Bm_SXc9HAMOzWO0bJrNsPkd0Lk7voXto9WmXXcj3IVMp",
          deploymentStatus: "completed",
        },
        {
          index: 97,
          address: "EQBwdXAmly0hE65YlFonoUaOGkLKhTlj7V4HJkLXADgB8qCU",
          deploymentStatus: "completed",
        },
        {
          index: 98,
          address: "EQAg9OMq6njvmHr3ez5W4nIetwn_AnwZXCIPRPxtQZBd1TmC",
          deploymentStatus: "completed",
        },
        {
          index: 99,
          address: "EQCBGNdszebqph5nFLc-S4XPrThVLBDQICbi2a9Ri8CZtC2i",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "1.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 100,
          address: "EQCLnj1GDCwsr53GkPWx_sJ26CXYn2CUgrlqb8E1SFh8Z2M2",
          deploymentStatus: "completed",
        },
        {
          index: 101,
          address: "EQDaXSNm2P4IefiP9jt4IgfyxZ2BTYGEVdv2BLLkrvGqPtA9",
          deploymentStatus: "completed",
        },
        {
          index: 102,
          address: "EQDHcY3gO_iAt7SNqiCc0MFmXTBfQN72G5M4e3LhvedCpA8u",
          deploymentStatus: "completed",
        },
        {
          index: 103,
          address: "EQAGDTXpA3PQgin3I7-XxyUy0zZeT3zmdasbdtXWh6FuAzVj",
          deploymentStatus: "completed",
        },
        {
          index: 104,
          address: "EQDoP041XP2szbNFlgrMfiyohpDlc_czFP3zMn5BU-2EGDVB",
          deploymentStatus: "completed",
        },
        {
          index: 105,
          address: "EQDWJZlTM7hZkjzTn75sPGCJxumI30VWap7qsq-2kcEW32Af",
          deploymentStatus: "completed",
        },
        {
          index: 106,
          address: "EQD-Jgbde-QcVWLXcQTVyiIZtCpjmR5L_qvZUlRA1CENnyxj",
          deploymentStatus: "completed",
        },
        {
          index: 107,
          address: "EQDcl7kE3Pdz15VYRIdFFK9QJNZlduZo9YsI6mmdCsRkbGAd",
          deploymentStatus: "completed",
        },
        {
          index: 108,
          address: "EQAQWYizsQporBPLHaaBmMJeGPUj5mcIcjQzwRAD6wEgc0FT",
          deploymentStatus: "completed",
        },
        {
          index: 109,
          address: "EQDaLkS-MQjFnTWn3w9ZJUmURYnQT35N432vNrt43yHJQV01",
          deploymentStatus: "completed",
        },
        {
          index: 110,
          address: "EQAfXzwgO-b3XLAxPeQl6gBINsb_ZrpbQiKfADNxt46v-h3Y",
          deploymentStatus: "completed",
        },
        {
          index: 111,
          address: "EQDEY2s952Xjzjtf6DkUQhdGpqZdkpSSHih3dWLW07hxFtij",
          deploymentStatus: "completed",
        },
        {
          index: 112,
          address: "EQBXM-mQz9peznWH_VWocsHrCCt_I2ZIKMW5V3mRt3RPst26",
          deploymentStatus: "completed",
        },
        {
          index: 113,
          address: "EQBVObH2Z5li0XWkVqBN2WQg21Id2s8S0BO7H_1RF2j8iQV-",
          deploymentStatus: "completed",
        },
        {
          index: 114,
          address: "EQC3B7xEnaDqCJh0oc_w5X0K809yfp7PK4wS-4eZyJB7926D",
          deploymentStatus: "completed",
        },
        {
          index: 115,
          address: "EQAOPhKO4z013ApLZ0csqp8r1si4EG2qJMQBnqd4WDDflJNI",
          deploymentStatus: "completed",
        },
        {
          index: 116,
          address: "EQArYSOzokDyVhmvNzU0mNEOkDmGWCr3rsmm1mka772CitzH",
          deploymentStatus: "completed",
        },
        {
          index: 117,
          address: "EQCtqaYqh4JS_NIX4rgl63l3HZQoQ2y87DIvx4dieuFrpZjz",
          deploymentStatus: "completed",
        },
        {
          index: 118,
          address: "EQA0Vku7N2W1qsj8pRz-9U8QGqLP64StGiPx3MMlLcWsYqWo",
          deploymentStatus: "completed",
        },
        {
          index: 119,
          address: "EQALRoM5t4UukQ0L7csc-ZwzFRNzN6DTlUljFfexdAcekSek",
          deploymentStatus: "completed",
        },
        {
          index: 120,
          address: "EQDnpK4QZvxRjZ9N3NyyYwOAhbrGb5-72GBxLS1ronvBq8ID",
          deploymentStatus: "completed",
        },
        {
          index: 121,
          address: "EQCc-HLFj__-bI-u9WV2g1bNoZUfBYghTaxdJqyeCaVxtVt_",
          deploymentStatus: "completed",
        },
        {
          index: 122,
          address: "EQCoVsLSL4iXWFHJ6zsf-N0X6KdxlhIqfHewqLq_pMho2U7_",
          deploymentStatus: "completed",
        },
        {
          index: 123,
          address: "EQBuDFRxlExV1BHKIKlpz7rW7L0NGud9FevrBN6JMcHoohc8",
          deploymentStatus: "completed",
        },
        {
          index: 124,
          address: "EQAT4hWQrdzbrqRM_B9wb9p49JaVD6W6SI9XMuVAVOXTuhTa",
          deploymentStatus: "completed",
        },
        {
          index: 125,
          address: "EQDJBF0YlT8Mn8AH-fljBrC5vnR0b41AonfDTAApI6W1ASeQ",
          deploymentStatus: "completed",
        },
        {
          index: 126,
          address: "EQAc4sPDbAalkiOjb9_avmtsD_gdVKPDgIZbwFxyjyEO_w5g",
          deploymentStatus: "completed",
        },
        {
          index: 127,
          address: "EQAgcEGxvA0UrFPXobycQJlgCC3p9mzRQ_cm0T3qpqrUTCC0",
          deploymentStatus: "completed",
        },
        {
          index: 128,
          address: "EQD7pNLMts6RTv2d0ZUr-tJueVdG5T4ka3r-b6CR0rt7d8VP",
          deploymentStatus: "completed",
        },
        {
          index: 129,
          address: "EQCD96Td71dhOjvB4aZyMfeVVZjOFVsEijM_SrBRjY4s4iOR",
          deploymentStatus: "completed",
        },
        {
          index: 130,
          address: "EQBMtO5p4w8Vleks7YAJFDYlpNx-clzkM-EzzwZ5mD9huQwN",
          deploymentStatus: "completed",
        },
        {
          index: 131,
          address: "EQCy_f8Iw6kmOuBmSWw8MvVcjKE5eha0A6gPkSzJJSrrdNii",
          deploymentStatus: "completed",
        },
        {
          index: 132,
          address: "EQCz2jHF8vRmWAAXgPO01bsQJwJXOvLKSR0BCBZQX6mNW1E8",
          deploymentStatus: "completed",
        },
        {
          index: 133,
          address: "EQDenzN5gFGRMEWZADTUGfSgD5kwtLnbcD47TSCBWsckQjYk",
          deploymentStatus: "completed",
        },
        {
          index: 134,
          address: "EQAUlZnVjYAXbiWGltjh3AzS_IwTKprHTOl40ur9gbB6BNnU",
          deploymentStatus: "completed",
        },
        {
          index: 135,
          address: "EQDytB1xsezBmvEwb7b1fHJtrZbOs1VVvz-ofWf24NIamTOX",
          deploymentStatus: "completed",
        },
        {
          index: 136,
          address: "EQBrg2r-BiqOj2tQl5YI1mpOpOjJuFCr841R3kKpryQZepBQ",
          deploymentStatus: "completed",
        },
        {
          index: 137,
          address: "EQBgm_omKOEhgfh5Kp_gHelpVbXocTP2ZrMFqz4PEwwSufOu",
          deploymentStatus: "completed",
        },
        {
          index: 138,
          address: "EQAVuZ3tvEL3TVDWcxFZtVmKNPV2rESVwBUAIe8OpxvdcG0Q",
          deploymentStatus: "completed",
        },
        {
          index: 139,
          address: "EQB39U1JozxknnvNUDvS4RFLV_YiIRRxCJRVFcKlSu2u4D1f",
          deploymentStatus: "completed",
        },
        {
          index: 140,
          address: "EQAT7J7NBSHuhvQvLZ8GFAe6yHR6PhhQB_ZNlcWpzyH6xqsu",
          deploymentStatus: "completed",
        },
        {
          index: 141,
          address: "EQDP-M-KTn0lkmcwkkv42FySgGZS-QxCDa-WHCH73nxeAL0O",
          deploymentStatus: "completed",
        },
        {
          index: 142,
          address: "EQCfqPTBod7ZiWPLYw-DpLEuwgp6gtcLkPkNFRozY10uWLrX",
          deploymentStatus: "completed",
        },
        {
          index: 143,
          address: "EQBkJRdXlL5-5so0o_Pn5494lbFtnWHHAbtET9IkcNOZk0hP",
          deploymentStatus: "completed",
        },
        {
          index: 144,
          address: "EQDTvZYRRzNp2SPKQUVym7tLGRNKcLF5uInc8fqbTo_ztMn9",
          deploymentStatus: "completed",
        },
        {
          index: 145,
          address: "EQAbPxzIsbFobyw_NkcaKKoO7ko17xJDv4t1N9UVeiYuou0N",
          deploymentStatus: "completed",
        },
        {
          index: 146,
          address: "EQDI2U6emoYgzVnNSD1aSBdfxMKLqUcGW8rKfIk2LAmlIZZ7",
          deploymentStatus: "completed",
        },
        {
          index: 147,
          address: "EQAIGaVKePKYu62eDyFgHsq0wwqzfNaaLf6CQvnoYc1jybaV",
          deploymentStatus: "completed",
        },
        {
          index: 148,
          address: "EQDAPIaS3RppJNAdavQu3p0DQNUWYCvLmtZGPYGi7CXjv9qh",
          deploymentStatus: "completed",
        },
        {
          index: 149,
          address: "EQCOVsNylFk59BPHGw_yfkzkdIdWT-Tn4mBkdeIZ5_HosQNJ",
          deploymentStatus: "completed",
        },
        {
          index: 150,
          address: "EQBAqCrMIF08pzKNg-KWmDbtKss6e7JxM72-4ueHAqXYs8Uy",
          deploymentStatus: "completed",
        },
        {
          index: 151,
          address: "EQALz5cArT6SFIIzdT8g6gYcpxKnRCF2K2ONeyUXu3SxWynL",
          deploymentStatus: "completed",
        },
        {
          index: 152,
          address: "EQBNNMFYzFrFO0xe6SA0yYwTFZwtwsAz0NUCTUhXv5JX44zk",
          deploymentStatus: "completed",
        },
        {
          index: 153,
          address: "EQDzXMoeqEqqXpMkjNU75jxIthL8mPLt1VNuEOEbwlizraZJ",
          deploymentStatus: "completed",
        },
        {
          index: 154,
          address: "EQA1Fk3dS2BQd2IxS4XEzdZgIL3JBzRju4DajGbrLe4XR3Cj",
          deploymentStatus: "completed",
        },
        {
          index: 155,
          address: "EQBP-obn0adLWLlgyCf7QZWD7QUoS_ZcU1ox0kdgWj7cmpex",
          deploymentStatus: "pending",
        },
        {
          index: 155,
          address: "EQBP-obn0adLWLlgyCf7QZWD7QUoS_ZcU1ox0kdgWj7cmpex",
          deploymentStatus: "completed",
        },
        {
          index: 156,
          address: "EQAaIu50zQHx_OfebGrCS_sV7jcKr2fhCRWZmJuKmKl-pLk2",
          deploymentStatus: "completed",
        },
        {
          index: 157,
          address: "EQCtSU_I44xrhBtxzs6EIxfIa8h71x_NTrEeTbmPLBbMKk2L",
          deploymentStatus: "completed",
        },
        {
          index: 158,
          address: "EQCk3eV8yhbuG6fewaPp7CRw5HEM0auK1bdvusdOuls3jxco",
          deploymentStatus: "completed",
        },
        {
          index: 159,
          address: "EQBAJB-K6n22cnHoEpRzFAGej3Mv9L8Es2aTugIfDUTLrexF",
          deploymentStatus: "completed",
        },
        {
          index: 160,
          address: "EQAC6yIG9QL8i18-BRsCFqQvEM7rhyz4QfuEaSJnaScC4uA0",
          deploymentStatus: "completed",
        },
        {
          index: 161,
          address: "EQALVGMew6ew7IWA3kndS1HLHgsrBmQv--e4aq7APoODvgCZ",
          deploymentStatus: "completed",
        },
        {
          index: 162,
          address: "EQAMAfzvzH7C8M_x9ezFW43yHbylqpn0eAHuqu1g1_EGDogX",
          deploymentStatus: "completed",
        },
        {
          index: 163,
          address: "EQC991sRATM_2y11pNttOWrSag0--sPWdQHWsV_nGpOkUWC2",
          deploymentStatus: "completed",
        },
        {
          index: 164,
          address: "EQA9TsVd7US7RC6bs5Og7vObIeZcBhX6jGKa6enhliKArZTn",
          deploymentStatus: "completed",
        },
        {
          index: 165,
          address: "EQCR3gF3uZQKj5GBn6gKImRgSbRFHt5_g3NLWSyAhex8PJ7B",
          deploymentStatus: "completed",
        },
        {
          index: 166,
          address: "EQBb0f-DAlsHCDFSE0pY1a13z3FWaKmI0ziS7qxgnOI1eOzS",
          deploymentStatus: "completed",
        },
        {
          index: 167,
          address: "EQC-DGsZG3VIjUYrBbjEqsOEcOnzEUdxPn6idEswG_ZVfGVC",
          deploymentStatus: "completed",
        },
        {
          index: 168,
          address: "EQCZgQReME1WrPNQ1eIGI1Pd-WjWyTbx89P6hOjs7pDBeWjX",
          deploymentStatus: "completed",
        },
        {
          index: 169,
          address: "EQAehYYDjwt26Vd7iHltZZ-pxxQEZRSbQhOv2aLdlWxxKPfY",
          deploymentStatus: "completed",
        },
        {
          index: 170,
          address: "EQColngHcGI1UXkvo-PNPwCFC99Cn6fyANGCb6MLvIfimO2k",
          deploymentStatus: "completed",
        },
        {
          index: 171,
          address: "EQB7Yy_gopgbsf6kzKBgD68o9oBdqv65q_kis1-EmAZYHIir",
          deploymentStatus: "completed",
        },
        {
          index: 172,
          address: "EQCj8aTOZdRVt3kNb6RvGWgRYG644HvM4C9M57eLkpFKCHIE",
          deploymentStatus: "completed",
        },
        {
          index: 173,
          address: "EQADAFmG7peZSTP-16VSM1FUXzFIPg0_Nq0a6wtoJktnCgfB",
          deploymentStatus: "completed",
        },
        {
          index: 174,
          address: "EQBeuBsFOJ9PSZOYJ3nrVZ14W3uiBPaGx43Ao2vzOKewK2u6",
          deploymentStatus: "completed",
        },
        {
          index: 175,
          address: "EQC9tY4W2Ll8WfHfLN_95MyuYwU1iAMHmUgj3nX_tZbeZG89",
          deploymentStatus: "completed",
        },
        {
          index: 176,
          address: "EQDV0tNE9ClWs7R2l5AiPM1dblGTxkF2bl-VjiSEQ4r2juuK",
          deploymentStatus: "completed",
        },
        {
          index: 177,
          address: "EQDCg6bYlB5bZ__A1pIcjcuMcLaGWrzQl1faISskfHzFKZkI",
          deploymentStatus: "completed",
        },
        {
          index: 178,
          address: "EQA7iRVXkXzrOO1e6rJaIHZ8ESTN0vfRQo70VrA8_G7ABqlX",
          deploymentStatus: "completed",
        },
        {
          index: 179,
          address: "EQAyGCJtbW8zUmSglHe1_V45DBWqIlPFSY3-gXROcmML48Ej",
          deploymentStatus: "completed",
        },
        {
          index: 180,
          address: "EQDeIUkX_wrpNAeYy_uysMf4f0Xh9a4ucSxNB51beIsoDkXV",
          deploymentStatus: "pending",
        },
        {
          index: 180,
          address: "EQDeIUkX_wrpNAeYy_uysMf4f0Xh9a4ucSxNB51beIsoDkXV",
          deploymentStatus: "completed",
        },
        {
          index: 181,
          address: "EQDUixxGHMiiyWpS1Tf5WTR8UN-8QfatOI_mdkUL7dR6GS0V",
          deploymentStatus: "completed",
        },
        {
          index: 182,
          address: "EQD9nCqDFqMca28_HaKs5XqZRUoVSHpp-HaWK6MNrMOVMkb8",
          deploymentStatus: "completed",
        },
        {
          index: 183,
          address: "EQB77TL4hdjedv2W4OkBfakfPIUTmV0VlZChVxAh6TVpOCjF",
          deploymentStatus: "completed",
        },
        {
          index: 184,
          address: "EQCo1z56c1NelZp4p04C0K_Sh_-Eix5BJ3zpKQ4TcAKNjpfk",
          deploymentStatus: "completed",
        },
        {
          index: 185,
          address: "EQCUvu4kX-MscPMmpQfHRkGoeAzhISYf2UZCpxhqz1M0wfJP",
          deploymentStatus: "completed",
        },
        {
          index: 186,
          address: "EQCdSjxsAW7FN-k3VG6QR0bCFG98msc2pSn5rfL4WRd8ivi-",
          deploymentStatus: "completed",
        },
        {
          index: 187,
          address: "EQDXLNrsDWmJ1JEqYhN-Po04d9XvZHQ49Qum2rucSWGrmvag",
          deploymentStatus: "completed",
        },
        {
          index: 188,
          address: "EQA5tfXI9woVsxAvOkUdUZ70SxphU28XPHi2XhCtt9A2kg3P",
          deploymentStatus: "completed",
        },
        {
          index: 189,
          address: "EQC0nDjCiRzpdfldPzXCd5NE7AMJi-OxPeN3sLYLe6BfiwDy",
          deploymentStatus: "completed",
        },
        {
          index: 190,
          address: "EQBkHB-aODNk3ZJ2Kx8faas1qiwDFXLuBIGhICx5rjINOzOz",
          deploymentStatus: "completed",
        },
        {
          index: 191,
          address: "EQCiXLhKlMJSSmoW46AmA4-US1ew-gahG10qXU2cxWCdRt2t",
          deploymentStatus: "completed",
        },
        {
          index: 192,
          address: "EQAIzaYxaieyiO7hQzOfuwhnioNyE4T-i7ds52u-BCAk-sbc",
          deploymentStatus: "completed",
        },
        {
          index: 193,
          address: "EQCdcwiuQv8SJfPRF-96Hr6IvACK4SVVstZOqg7fceMMCHp-",
          deploymentStatus: "completed",
        },
        {
          index: 194,
          address: "EQCjHyliNfHPvxMk1NOLuMmA-Lydkb19jW59PQFcD2IvtMOh",
          deploymentStatus: "completed",
        },
        {
          index: 195,
          address: "EQAeXrko_3_BJXakD_unifLKJD_hAdPtm6KJdXIDfqJXKfPr",
          deploymentStatus: "completed",
        },
        {
          index: 196,
          address: "EQCjLCLxqpc-EXeuG9DIHNXNbvzssJBFBmLHGVfPQWDLJxiS",
          deploymentStatus: "pending",
        },
        {
          index: 196,
          address: "EQCjLCLxqpc-EXeuG9DIHNXNbvzssJBFBmLHGVfPQWDLJxiS",
          deploymentStatus: "completed",
        },
        {
          index: 197,
          address: "EQC2b104YugLXNxYTvcLU9UPmZyG5LH8VATz3Szh41Bi8OD7",
          deploymentStatus: "completed",
        },
        {
          index: 198,
          address: "EQB5N_drMO0l3MMY5m7ni7Mow8F7xgBuuNiXCPJFuefUWbBF",
          deploymentStatus: "completed",
        },
        {
          index: 199,
          address: "EQDlcRQ3H7ex6Yeh3xBN2DDXKUW6OuP84YbCDhvqDGYiOOx1",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "2.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 200,
          address: "EQC_Sg2tRkMbgJ4qnEo2r2qCYx7SOAyvJfES3v1Kww1oZu37",
          deploymentStatus: "completed",
        },
        {
          index: 201,
          address: "EQCJdEkcQc3nWaUiGiSfxQeeqvpEFCI2y6MDgzQYqxHV3un3",
          deploymentStatus: "completed",
        },
        {
          index: 202,
          address: "EQDzvFQVbk8t0egRpH_-PxXsrua0C5tzp9L7UYNAjw3LCxHA",
          deploymentStatus: "completed",
        },
        {
          index: 203,
          address: "EQCde23tvbXF2YUNFfuuMMWbIkDvY3sLJdPyryFtvQqU9lGw",
          deploymentStatus: "completed",
        },
        {
          index: 204,
          address: "EQBpsd5RcYeBUiPesp7_HosKaLO34XJFDfSTQNFzXZTMsuf7",
          deploymentStatus: "pending",
        },
        {
          index: 204,
          address: "EQBpsd5RcYeBUiPesp7_HosKaLO34XJFDfSTQNFzXZTMsuf7",
          deploymentStatus: "completed",
        },
        {
          index: 205,
          address: "EQCdqqGGh_0kT80uXm7lAYo29C5vreH1q93SQ_LMn9LvNQX9",
          deploymentStatus: "completed",
        },
        {
          index: 206,
          address: "EQCLAAMr0_aURoCLH3SEfMSKs6D0IxDDwFEJxXA7eGsVCjOK",
          deploymentStatus: "completed",
        },
        {
          index: 207,
          address: "EQCe6qKv3W0epC8jsETEAFh8QUSgwzbSVRo2Q8IX-RZ4p161",
          deploymentStatus: "completed",
        },
        {
          index: 208,
          address: "EQBJE5T8oEm4WLfx_4Ht01ZoZIZzUxmJ3NWPTYvPAj7A5Hdc",
          deploymentStatus: "completed",
        },
        {
          index: 209,
          address: "EQD6cKvLrdGb3IIEm0pN9kTUckwAkpYU22AeH4okjaAW12S6",
          deploymentStatus: "completed",
        },
        {
          index: 210,
          address: "EQARnyh0zVJovbC2-UtxKFBYAAyu0-O8Wj923Bf6T2ZZpzmy",
          deploymentStatus: "completed",
        },
        {
          index: 211,
          address: "EQBffXKb49LIXYeZnqKi2JGKvZt1tciCe_MS8DyM7CqOiiru",
          deploymentStatus: "completed",
        },
        {
          index: 212,
          address: "EQAv6fZJcb8gQgJl_N2NoboJSx2cqJRhZEDX5GvxwGZm4y9P",
          deploymentStatus: "completed",
        },
        {
          index: 213,
          address: "EQBjyeOPpNwPEW5XQIoW9V7O3ZD4jQYyaSndBPj3B-SMYYqA",
          deploymentStatus: "pending",
        },
        {
          index: 213,
          address: "EQBjyeOPpNwPEW5XQIoW9V7O3ZD4jQYyaSndBPj3B-SMYYqA",
          deploymentStatus: "completed",
        },
        {
          index: 214,
          address: "EQC5WQEZom7Ar2mHdD66ktKwwB3jZis1Y1ruolxB3U1bX-Jc",
          deploymentStatus: "completed",
        },
        {
          index: 215,
          address: "EQDf-GD0l5mhDs4_zTF0wHmgrEbunvGhhltB1aM0wFf-2zoF",
          deploymentStatus: "completed",
        },
        {
          index: 216,
          address: "EQBsdbnE0jCctNO2ksJDEP39XpX4534VfkCIqwWYPdPv1oAU",
          deploymentStatus: "completed",
        },
        {
          index: 217,
          address: "EQA9kIVxGnwZMV0FZwDmbuZQUtUj-Cv-Fxi1OcoI64Ry82XG",
          deploymentStatus: "completed",
        },
        {
          index: 218,
          address: "EQCWMiuoUYcmkORhnMdDBbW3yFdO-y96wnvzLWUd2BBBhRk3",
          deploymentStatus: "completed",
        },
        {
          index: 219,
          address: "EQCvMGswxJHZQLWZn3fPZtCWkVB-VXkfF1jBDeFJQwfVPwt9",
          deploymentStatus: "completed",
        },
        {
          index: 220,
          address: "EQD2fAfYU9bP790tqMO6dbYAvRqhQWwT2ycB0kkxVg3VT9xx",
          deploymentStatus: "completed",
        },
        {
          index: 221,
          address: "EQAEvscjqAd8ZY0V-o0Tx_eGeoSkQGV--sBfaQGTaV69DoUR",
          deploymentStatus: "pending",
        },
        {
          index: 221,
          address: "EQAEvscjqAd8ZY0V-o0Tx_eGeoSkQGV--sBfaQGTaV69DoUR",
          deploymentStatus: "completed",
        },
        {
          index: 222,
          address: "EQDduj0-6xKms6gIVWm9lqT70K2PVYKJ5laQ3w3iJVs-ULJ9",
          deploymentStatus: "completed",
        },
        {
          index: 223,
          address: "EQAaFWFP_RC15vMmD2wH6FNu_dcbawmHwbEkdHWo0v7-lcMh",
          deploymentStatus: "completed",
        },
        {
          index: 224,
          address: "EQDDQDR1GN5YE6SHXZ6yxfpEZ6B7WFCLS116CmKsDnA7y6Ee",
          deploymentStatus: "completed",
        },
        {
          index: 225,
          address: "EQBiDXkivlogFgLIlW-olCb9fDCL5_qjV63r-74QKjP3BsuP",
          deploymentStatus: "completed",
        },
        {
          index: 226,
          address: "EQAHdLwwP29MxoVRNqFAi0zl3nd91bno4nnhwozEcf8yADRU",
          deploymentStatus: "completed",
        },
        {
          index: 227,
          address: "EQA5A9SYOzf3wb5HvzfXjCj6VHRf5diWx5EKw6yK7PmOImIT",
          deploymentStatus: "completed",
        },
        {
          index: 228,
          address: "EQC2L9xqsNpV5kLCOl6tCN3g45suaeWC01MzqyETJ3R66Usp",
          deploymentStatus: "completed",
        },
        {
          index: 229,
          address: "EQBVslcsZgRgR-2j2U5rYgThZQcnnXHRloqHh3BBQ1IdCHaD",
          deploymentStatus: "completed",
        },
        {
          index: 230,
          address: "EQCT__fyRAZjibro4cIXgev0nE7HOcZlPb-uJSJpqtcwyqH2",
          deploymentStatus: "pending",
        },
        {
          index: 230,
          address: "EQCT__fyRAZjibro4cIXgev0nE7HOcZlPb-uJSJpqtcwyqH2",
          deploymentStatus: "completed",
        },
        {
          index: 231,
          address: "EQAJABPnACMyO6NCBrCYb55I5uXeTFmH71_Rja-2IYnHDhlE",
          deploymentStatus: "completed",
        },
        {
          index: 232,
          address: "EQC8rgOB8UjRjNS1oy7Bsct-XjZ2NjJx97tl66BoPz6VCy8I",
          deploymentStatus: "completed",
        },
        {
          index: 233,
          address: "EQBRImoqMnYs789WCaqz5srK4KTJNU1cHoDyY5aZ_jzAKOkn",
          deploymentStatus: "completed",
        },
        {
          index: 234,
          address: "EQCSrN03F7KL5sctMMsig1jhkYvtXEECFYsVDWc41TDz4Gbz",
          deploymentStatus: "completed",
        },
        {
          index: 235,
          address: "EQDUHZMEPrnG6GKQua1DzrfLZ1KEQtPd9tsSVqQdMQi5F9bL",
          deploymentStatus: "pending",
        },
        {
          index: 235,
          address: "EQDUHZMEPrnG6GKQua1DzrfLZ1KEQtPd9tsSVqQdMQi5F9bL",
          deploymentStatus: "completed",
        },
        {
          index: 236,
          address: "EQCSOWFXfzYn2JXg200JOM266qfWEZv8wdvJmpXxMTgJMlKC",
          deploymentStatus: "completed",
        },
        {
          index: 237,
          address: "EQAB420dZFh03bgLoM6DDt99fyuKW8ZUTOh8F579PrJvK6vY",
          deploymentStatus: "completed",
        },
        {
          index: 238,
          address: "EQAjXU7e6Q0K0yQQtgSv2HtFtFlI7N2uP3AzAeXCPRbmdrrJ",
          deploymentStatus: "pending",
        },
        {
          index: 238,
          address: "EQAjXU7e6Q0K0yQQtgSv2HtFtFlI7N2uP3AzAeXCPRbmdrrJ",
          deploymentStatus: "completed",
        },
        {
          index: 239,
          address: "EQB6xTM9XEfw1ColgKjRHklz7WjF4vMDb2XruqwgP7xdc8fp",
          deploymentStatus: "completed",
        },
        {
          index: 240,
          address: "EQAUiUVMocWcGpp3P29b8faoT7m8_lCqwk0OcQ-xkQHDRyje",
          deploymentStatus: "completed",
        },
        {
          index: 241,
          address: "EQCK818OJC8mLjeH_QersOtAVOXOyUJNzqnO169o0DuW6B1I",
          deploymentStatus: "completed",
        },
        {
          index: 242,
          address: "EQCIXu-S_reqvCG9xch_9cij2jopb28UfFwFEFtb7PABTpVT",
          deploymentStatus: "pending",
        },
        {
          index: 242,
          address: "EQCIXu-S_reqvCG9xch_9cij2jopb28UfFwFEFtb7PABTpVT",
          deploymentStatus: "completed",
        },
        {
          index: 243,
          address: "EQAqK8HVHNWiY3EIBregupeTWmE1YbBTNJQEgy9Y6ko9ahqI",
          deploymentStatus: "completed",
        },
        {
          index: 244,
          address: "EQDsHAXhROgWG8_cgT1IbGlt46PUACaoode58ddExlY0Q566",
          deploymentStatus: "completed",
        },
        {
          index: 245,
          address: "EQBrrsu9nHZTaZsPrJYgdYmkw8fa3sE0fX6lHs7wqxk6j-VT",
          deploymentStatus: "completed",
        },
        {
          index: 246,
          address: "EQByQroKLuDYMZ5XIyCuhDEiB5t-NmAfoLvMcGBHmvf9UGLY",
          deploymentStatus: "pending",
        },
        {
          index: 246,
          address: "EQByQroKLuDYMZ5XIyCuhDEiB5t-NmAfoLvMcGBHmvf9UGLY",
          deploymentStatus: "completed",
        },
        {
          index: 247,
          address: "EQBmLiLS7UE9hju_DWnr4qkHf9I7wOjcHtTwFqBFDxBVpVM8",
          deploymentStatus: "completed",
        },
        {
          index: 248,
          address: "EQAIzKsZUu7v3p9erRQAYN0pvxStWITAETvqOJg5ZwMvXYsu",
          deploymentStatus: "completed",
        },
        {
          index: 249,
          address: "EQB5gPKVvA45AbDeCZeL6WIum5gTH7A-y03xrSUIBP5gWeDd",
          deploymentStatus: "completed",
        },
        {
          index: 250,
          address: "EQATbmTZXUrRjbQD5LK_UmIORJdKVXapUnLblqsarMqW8ae-",
          deploymentStatus: "pending",
        },
        {
          index: 250,
          address: "EQATbmTZXUrRjbQD5LK_UmIORJdKVXapUnLblqsarMqW8ae-",
          deploymentStatus: "completed",
        },
        {
          index: 251,
          address: "EQDDhE10tdWi7R7VFA1vfbk_Swq-Re23QABYRlBD_A1Kvd-O",
          deploymentStatus: "completed",
        },
        {
          index: 252,
          address: "EQBqDYbsyH3e1nqGru3R3-8ZlRotMhtXJwxKDeh7fFUkmi6b",
          deploymentStatus: "completed",
        },
        {
          index: 253,
          address: "EQBJ7muAcGveWrS5Swq_fpSmTN061onUKWMJe5NO_yrjS6Qs",
          deploymentStatus: "completed",
        },
        {
          index: 254,
          address: "EQAwQZvSYfvcYv2KZ3qYSmVTS0uPIUoHs0Q47jGwPv0giQyN",
          deploymentStatus: "pending",
        },
        {
          index: 254,
          address: "EQAwQZvSYfvcYv2KZ3qYSmVTS0uPIUoHs0Q47jGwPv0giQyN",
          deploymentStatus: "completed",
        },
        {
          index: 255,
          address: "EQCHrmz5TI6ULI6UYkqnmNr-lij3z5LTQWa62-6Fuf-AAiJ2",
          deploymentStatus: "completed",
        },
        {
          index: 256,
          address: "EQC42KQpgfcdJtxzWDKKaqem6pHfEeDVUgUAFI0lrkIephuH",
          deploymentStatus: "completed",
        },
        {
          index: 257,
          address: "EQBtIhnQBMTYFoAwuo6k76D1k4WvKXDF_LYB3Y_VH_b5YAQC",
          deploymentStatus: "completed",
        },
        {
          index: 258,
          address: "EQDaeRCL9qReFOFK9MOk7imsf6PN4Vnv60ioddgdLUSllg8R",
          deploymentStatus: "pending",
        },
        {
          index: 258,
          address: "EQDaeRCL9qReFOFK9MOk7imsf6PN4Vnv60ioddgdLUSllg8R",
          deploymentStatus: "completed",
        },
        {
          index: 259,
          address: "EQDEk7m9Z7YGNi3A7xMm32Nw7lp44YJPO85dBwSRjA0rOMkO",
          deploymentStatus: "completed",
        },
        {
          index: 260,
          address: "EQBD3ywg94giTuLt5sArNvxRFlvvQMjuNePfQsz_OdY-1Bwx",
          deploymentStatus: "completed",
        },
        {
          index: 261,
          address: "EQDc7gBXA-rhzppEAznfmyRBGzatVOYQWo-Rf4WG_6AEJCuL",
          deploymentStatus: "pending",
        },
        {
          index: 261,
          address: "EQDc7gBXA-rhzppEAznfmyRBGzatVOYQWo-Rf4WG_6AEJCuL",
          deploymentStatus: "pending",
        },
        {
          index: 261,
          address: "EQDc7gBXA-rhzppEAznfmyRBGzatVOYQWo-Rf4WG_6AEJCuL",
          deploymentStatus: "completed",
        },
        {
          index: 262,
          address: "EQDjotw2UNocL8CDS8XcDBNSWq8xTr4VylJLkYXCNBp60JIV",
          deploymentStatus: "completed",
        },
        {
          index: 263,
          address: "EQDScAEiRRddjOMYem_0ImL7MDA5UIiavOLYjGA5HNZYllVX",
          deploymentStatus: "completed",
        },
        {
          index: 264,
          address: "EQDDR3s_JNpbuF2q1m7oWAIkJRyjv1DjJeiRiHUBD-2pHedS",
          deploymentStatus: "completed",
        },
        {
          index: 265,
          address: "EQDdSuEPlLnAUcLQm3umOtdcwfDBTPo7NeU0nyW6qScPdBmj",
          deploymentStatus: "completed",
        },
        {
          index: 266,
          address: "EQD6uBLiwkt7j-6wt6DOq4UKWI_GAB0jhzDbiH2tZGYaOYV5",
          deploymentStatus: "completed",
        },
        {
          index: 267,
          address: "EQCRR16Mc4FfxRbAuowJFoJzekuQx_Tb9RFeM3rp_rrxFO2g",
          deploymentStatus: "completed",
        },
        {
          index: 268,
          address: "EQCCmEBXv8KIVprbxTyR-77uzvAy0mUDwdF_esl4qzaBUhbO",
          deploymentStatus: "completed",
        },
        {
          index: 269,
          address: "EQCmluK0JoMiAHmbk04izN2qacjgb7qTKtrPE3IAI4e4gEmU",
          deploymentStatus: "pending",
        },
        {
          index: 269,
          address: "EQCmluK0JoMiAHmbk04izN2qacjgb7qTKtrPE3IAI4e4gEmU",
          deploymentStatus: "completed",
        },
        {
          index: 270,
          address: "EQC8TbRtCtyiTLtXNIIBHY-CEJRsrfNff5J2xwkS7N8KNndj",
          deploymentStatus: "completed",
        },
        {
          index: 271,
          address: "EQBPluxKxiSQliz2uceJBSJ3V5wSiN3Adqb1e4dUYafShOqn",
          deploymentStatus: "completed",
        },
        {
          index: 272,
          address: "EQBZfSFRskaIEsZraJLyA-0kTcO412VDTZPzfDZBVflC88Vy",
          deploymentStatus: "completed",
        },
        {
          index: 273,
          address: "EQBHcRkS8Zai1VUN74f_oH-sYuLFfORKRSq6fsvs3Ay75uw8",
          deploymentStatus: "completed",
        },
        {
          index: 274,
          address: "EQDQ3wBgfmrHOTEFrwgnIiXSJWPLtp1IfOj3rPFfXvj3NjBq",
          deploymentStatus: "completed",
        },
        {
          index: 275,
          address: "EQDZyD6fxexJN5ghAX8QGT5STNlgMf1CEetWhQxYH-9AQdHR",
          deploymentStatus: "completed",
        },
        {
          index: 276,
          address: "EQC4LFkdhrKL0Z74Pv_Ac5kgaFCoCCAwZcLA1Oxj-SycEkvM",
          deploymentStatus: "completed",
        },
        {
          index: 277,
          address: "EQBE1z1z4KIcHg7tKX26UTMIihx_W1LyIcFERAj4hiF4G6oe",
          deploymentStatus: "pending",
        },
        {
          index: 277,
          address: "EQBE1z1z4KIcHg7tKX26UTMIihx_W1LyIcFERAj4hiF4G6oe",
          deploymentStatus: "completed",
        },
        {
          index: 278,
          address: "EQA5ro-SyrFHaeUFDl0U7vTeeMB0r10hbnjRphWbC3e9kFEL",
          deploymentStatus: "completed",
        },
        {
          index: 279,
          address: "EQCBmuFiiLZM9JM9wyw83ve4vf5f-63fOBm9328lmD6xVMlW",
          deploymentStatus: "completed",
        },
        {
          index: 280,
          address: "EQAx874Kx6J4ocGWHzdE4uadV0v80aHbdCZdnODt9a0C0-2u",
          deploymentStatus: "completed",
        },
        {
          index: 281,
          address: "EQAc7OMhEvsze9WeWK6D9dmlDT84WOJpKm0WQYxc1iJP6zCe",
          deploymentStatus: "completed",
        },
        {
          index: 282,
          address: "EQAoXMikn4VAoj7EmhPYtVyZ16WxAHYWKTNPt1_bA33jDpBk",
          deploymentStatus: "completed",
        },
        {
          index: 283,
          address: "EQDpalhch57yKoLSVxPL3Uat8Z5nhckdjkcwvZPBBhD5yrGq",
          deploymentStatus: "completed",
        },
        {
          index: 284,
          address: "EQDUjZz03ml_4sybgXDYo9Jd0oftFFhhcL9ahbY-Wtklq5WY",
          deploymentStatus: "completed",
        },
        {
          index: 285,
          address: "EQAlpkr1mWw3dwzwObkqZPOP-jhoNdrg8pny6kqjSpaBkttJ",
          deploymentStatus: "pending",
        },
        {
          index: 285,
          address: "EQAlpkr1mWw3dwzwObkqZPOP-jhoNdrg8pny6kqjSpaBkttJ",
          deploymentStatus: "completed",
        },
        {
          index: 286,
          address: "EQByNGBGz2zPIw3isCW2GgBdIbbQnGYWYWp3nbdGhfitJrM2",
          deploymentStatus: "completed",
        },
        {
          index: 287,
          address: "EQDjQeLnx8mkihNVAMHkNCTONWUr96FFrNbkzdRXumAp1TYC",
          deploymentStatus: "completed",
        },
        {
          index: 288,
          address: "EQASV7C7Xw-TF6FEL2Lwkc9dQ92X_5pJIF7UjhTaADoJUNC7",
          deploymentStatus: "completed",
        },
        {
          index: 289,
          address: "EQAZTg5KIpJXdAAH_NNOQqRCAGcz7bT5whJoyPd5Bpy1lC9w",
          deploymentStatus: "completed",
        },
        {
          index: 290,
          address: "EQANEfZGyv2ZQ2Zn85JsOVZgaQT2BrBKXLMN9v6BmDmpdkJm",
          deploymentStatus: "completed",
        },
        {
          index: 291,
          address: "EQCsb8nu_xfI3jHz3GZAYT3miyLyIE7IgAkvAt9iQnGv2Bfp",
          deploymentStatus: "completed",
        },
        {
          index: 292,
          address: "EQC0yln9Em6AiqZKWQdCvC_-M1SxTXeNaB0Q7TTFVAmrdgRh",
          deploymentStatus: "completed",
        },
        {
          index: 293,
          address: "EQC0D3VC1LxSztoRnfXkF-rpsprGBQC7pJecLtBrwZ9fTyd7",
          deploymentStatus: "completed",
        },
        {
          index: 294,
          address: "EQCi559764uM_nKCAhEebMZ2BbRo55KIj49cw8qVWLNcyTEz",
          deploymentStatus: "pending",
        },
        {
          index: 294,
          address: "EQCi559764uM_nKCAhEebMZ2BbRo55KIj49cw8qVWLNcyTEz",
          deploymentStatus: "pending",
        },
        {
          index: 294,
          address: "EQCi559764uM_nKCAhEebMZ2BbRo55KIj49cw8qVWLNcyTEz",
          deploymentStatus: "completed",
        },
        {
          index: 295,
          address: "EQCehlML3l5uel86YpcJnTgNqtmtA92_h7iG-psQw05DvJ_g",
          deploymentStatus: "completed",
        },
        {
          index: 296,
          address: "EQA-_j1t5OCFt0wTZ7miuQ0IndLbRnXr4KL5EFCyBBfOkt1h",
          deploymentStatus: "completed",
        },
        {
          index: 297,
          address: "EQBvoXiF_kLCmsc-lakTRyIuwFxPk98XBpFvBaHFPUgbD9IM",
          deploymentStatus: "completed",
        },
        {
          index: 298,
          address: "EQA29hA-TuT8Z0wOFN5En6Qqr1W895d6HvyD1obSpA6LR11z",
          deploymentStatus: "completed",
        },
        {
          index: 299,
          address: "EQAknVLiWvL--6O8ZJOxRo_2g7qIyt5zJSrbzw6nJtvkIXLy",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "4.json",
      supply: 30,
      currentSupplyIndex: 30,
      copies: [
        {
          index: 300,
          address: "EQA6FtnElaXgFxV6tTYVZl_es-RTmR5pz1gZVTbcwKgH91-d",
          deploymentStatus: "completed",
        },
        {
          index: 301,
          address: "EQDq9N_mBLbSV0l9iHbclJxcWCAuSTsuOItzetbmHro6RlJF",
          deploymentStatus: "completed",
        },
        {
          index: 302,
          address: "EQCr30HGdJDWz7Xx-6zNsqNdGOZz-wDt_JH3Q0VQk28j-SIw",
          deploymentStatus: "completed",
        },
        {
          index: 303,
          address: "EQC-bFUU_Tcn2gLDZBJtkML1a7VZW_C2FegBJZRXv92sZ-k4",
          deploymentStatus: "pending",
        },
        {
          index: 303,
          address: "EQC-bFUU_Tcn2gLDZBJtkML1a7VZW_C2FegBJZRXv92sZ-k4",
          deploymentStatus: "pending",
        },
        {
          index: 303,
          address: "EQC-bFUU_Tcn2gLDZBJtkML1a7VZW_C2FegBJZRXv92sZ-k4",
          deploymentStatus: "completed",
        },
        {
          index: 304,
          address: "EQDKzEol4_2XQOeA3EYvUYaXGuJ4VjSBvwpy0rJzJ4arvNxh",
          deploymentStatus: "completed",
        },
        {
          index: 305,
          address: "EQDX6okveTnV0a_noKLsTWVVYK6jPh616Q9Kapgd54jOkCU3",
          deploymentStatus: "completed",
        },
        {
          index: 306,
          address: "EQD0e15Ca1ZojsZE4SoxqhQtub7ZfQORTdNbQN6MjY72lNBX",
          deploymentStatus: "completed",
        },
        {
          index: 307,
          address: "EQByBRLDBrW3lDERs1KT8s0sOfmu9PHArGj5Rc7644VtvrrS",
          deploymentStatus: "completed",
        },
        {
          index: 308,
          address: "EQDoF52k9JGt4Gqn_KnwOxAmiInxFTgt0OtyHeiPUOiLXpeq",
          deploymentStatus: "completed",
        },
        {
          index: 309,
          address: "EQBnf-un_JTVIVEbF6J-R-2XAKNrAPoeqyOrBQOsAvOIuCg0",
          deploymentStatus: "completed",
        },
        {
          index: 310,
          address: "EQBuXEBatFCL-kiJqXH8VVNRhieKoO_tj-tCuWASU_YQ76MN",
          deploymentStatus: "completed",
        },
        {
          index: 311,
          address: "EQCzQfUMKUg5VmdgMsMb1_4bvw6AUqrUhYO967VRy8-jku_e",
          deploymentStatus: "pending",
        },
        {
          index: 311,
          address: "EQCzQfUMKUg5VmdgMsMb1_4bvw6AUqrUhYO967VRy8-jku_e",
          deploymentStatus: "pending",
        },
        {
          index: 311,
          address: "EQCzQfUMKUg5VmdgMsMb1_4bvw6AUqrUhYO967VRy8-jku_e",
          deploymentStatus: "completed",
        },
        {
          index: 312,
          address: "EQAuYLGoIrVneCf5Xf_DAQs2RIIlK23i6v2vFwlQ2V8RFDHM",
          deploymentStatus: "completed",
        },
        {
          index: 313,
          address: "EQBz35QSEI-Ji9G2eC3H10-bvHeAy0tRMv33TvcR9Hr4d1l1",
          deploymentStatus: "completed",
        },
        {
          index: 314,
          address: "EQDIkNYo2xmm1IPuu7v5_lSq2DX7GraWJnWPrAUNSWJdB1En",
          deploymentStatus: "completed",
        },
        {
          index: 315,
          address: "EQAI6qnSXFFnRGdItr5GLu_3nplLSebBEai6u8xYD5uR-Gnc",
          deploymentStatus: "completed",
        },
        {
          index: 316,
          address: "EQBozqkqsQxz5DI9eQrVDCnyhCb8ZXba2CHV-tF2Su3aZ_qf",
          deploymentStatus: "completed",
        },
        {
          index: 317,
          address: "EQCBTzKgArrsNU4GNuDuZA7LOkAo6XpUDu07L9dJDDAxql9L",
          deploymentStatus: "completed",
        },
        {
          index: 318,
          address: "EQDwJrIHFUJ4OG9M4LmB8pvryuPmHfMIHOUjiQg5dYTllSm3",
          deploymentStatus: "completed",
        },
        {
          index: 319,
          address: "EQARYegaolvVFOxMkJPoYY-G96lMPgHmdm_h5W2OgmXOBCYN",
          deploymentStatus: "pending",
        },
        {
          index: 319,
          address: "EQARYegaolvVFOxMkJPoYY-G96lMPgHmdm_h5W2OgmXOBCYN",
          deploymentStatus: "completed",
        },
        {
          index: 320,
          address: "EQD-AkMIyXNwmCW6hlkHZID0PzLVeIGoxG3mzQRWcheqxywi",
          deploymentStatus: "completed",
        },
        {
          index: 321,
          address: "EQCZSYYbmK4p_3Hw01DkoxXBJV8YGJVBn0cgqMlJc2Qr52jI",
          deploymentStatus: "completed",
        },
        {
          index: 322,
          address: "EQAOYASjSVl5B3UegqquMBEQ9v7380lMIAFBk0bzoFp8Uk-Z",
          deploymentStatus: "completed",
        },
        {
          index: 323,
          address: "EQD3nrVlVuX5B5umLpCNkkHgmv4QRrTYx0zgWQWCrTV76uLJ",
          deploymentStatus: "completed",
        },
        {
          index: 324,
          address: "EQCL8iw0RZPodGeMZFcKWpQRjhXFvquRVFCCjbXcTqWzujzE",
          deploymentStatus: "completed",
        },
        {
          index: 325,
          address: "EQDIYkveHzO_pkiWIyeN64rvh7gT3_jI3FouHnUUQj5knC0m",
          deploymentStatus: "completed",
        },
        {
          index: 326,
          address: "EQBh0so5SaGEHVxBz5J-XquimqjXSliMzvhnAakoH_SBnZu_",
          deploymentStatus: "completed",
        },
        {
          index: 327,
          address: "EQBaEB-x9BXstAz1bHfQ7neYXkHHFfieRIjMqzvyLRrV0EB_",
          deploymentStatus: "pending",
        },
        {
          index: 327,
          address: "EQBaEB-x9BXstAz1bHfQ7neYXkHHFfieRIjMqzvyLRrV0EB_",
          deploymentStatus: "completed",
        },
        {
          index: 328,
          address: "EQCsWJrwuECuH8OLSQ3eLAOAQ-o7w64kq7kS84IVbLYb9U05",
          deploymentStatus: "completed",
        },
        {
          index: 329,
          address: "EQDcLzfgLHNFCt46Kwtgq2QbEJdURrKQvbt3XGZhAPgSR2zF",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "5.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 330,
          address: "EQBAQqpOEoIyBBTLif4fU6e9BcEphB6ouXwhCIh3nUP8SvGT",
          deploymentStatus: "completed",
        },
        {
          index: 331,
          address: "EQCo4uU7TwyBlpwGV36fHoMq6Voc75qBYrrTebF9MIW_ZFB5",
          deploymentStatus: "completed",
        },
        {
          index: 332,
          address: "EQC7Z5V30Ybpz_cItr8IzKJ2RL6uVSBVGNUumGabe4kwdXeh",
          deploymentStatus: "completed",
        },
        {
          index: 333,
          address: "EQDEk0BDqYYR6y83rL_xRf88ZbFqheoekwIS8SdkZ_HRtU7L",
          deploymentStatus: "completed",
        },
        {
          index: 334,
          address: "EQDytdjj2HRJ3nO9MormSKTe2hkRAU-v6qMwtRrYQUkcMQea",
          deploymentStatus: "completed",
        },
        {
          index: 335,
          address: "EQCPJzGEgRJ8xCH5AD1CWwl8ajej3A5WCrx7W8QIDd3X5nHr",
          deploymentStatus: "completed",
        },
        {
          index: 336,
          address: "EQCpZz27A2Fe9rQoA0NsU23QdbQI3qFqcpnAQKvcu9I9k2yC",
          deploymentStatus: "pending",
        },
        {
          index: 336,
          address: "EQCpZz27A2Fe9rQoA0NsU23QdbQI3qFqcpnAQKvcu9I9k2yC",
          deploymentStatus: "pending",
        },
        {
          index: 336,
          address: "EQCpZz27A2Fe9rQoA0NsU23QdbQI3qFqcpnAQKvcu9I9k2yC",
          deploymentStatus: "completed",
        },
        {
          index: 337,
          address: "EQCqHM1HP9xHCXhzqJaqRP2DsWzI4_kVTNkA7mnIkloGMq3S",
          deploymentStatus: "completed",
        },
        {
          index: 338,
          address: "EQCN-ojrsleQZ578V50NeYfbXudjKwFABut9-ReIIuIfxuhw",
          deploymentStatus: "completed",
        },
        {
          index: 339,
          address: "EQCZMFxp2SfU4kjGf3lTDiGEli8XkR6DVDXQo-2RL1yigd4S",
          deploymentStatus: "completed",
        },
        {
          index: 340,
          address: "EQCUh9dxe6688VBO9BZGu2GySDXFRNZHbPv9PIcJATiOhvZg",
          deploymentStatus: "completed",
        },
        {
          index: 341,
          address: "EQB31nVufGVUSWjCrIcbR_YtRfr84tNr28vpxJV71MwRniY2",
          deploymentStatus: "completed",
        },
        {
          index: 342,
          address: "EQDB7ybMX3AVKC_HPR4Qhq1y_TPLGifaKs3Kz7AfPWog31cL",
          deploymentStatus: "completed",
        },
        {
          index: 343,
          address: "EQASSH-ddF3NO-6eHk06CG9rxYyNaAVFtIIfvd_OQCJek_rS",
          deploymentStatus: "completed",
        },
        {
          index: 344,
          address: "EQDDJN16f16P6hK2oyvnLaWHFQugp3pOKHMtnFmHX3yOL0wt",
          deploymentStatus: "pending",
        },
        {
          index: 344,
          address: "EQDDJN16f16P6hK2oyvnLaWHFQugp3pOKHMtnFmHX3yOL0wt",
          deploymentStatus: "completed",
        },
        {
          index: 345,
          address: "EQAdo2GkfCIi1G8zhrXI9UtwHEJOezhwWMGqhlrok29ikFIZ",
          deploymentStatus: "completed",
        },
        {
          index: 346,
          address: "EQDqDr9-8tf7bJOSrln2_vErK5ITKyLXLRLoFqvlQvo1MxyU",
          deploymentStatus: "completed",
        },
        {
          index: 347,
          address: "EQC_xaWb3KM1ECZxogC5Unf_AmVOwxxhb6fjtmHhpY1-0ETG",
          deploymentStatus: "completed",
        },
        {
          index: 348,
          address: "EQCWeoLWtLpo5d8DY3WXc6uBWUWe5Tkgojzi6IeUd-JKjjIR",
          deploymentStatus: "completed",
        },
        {
          index: 349,
          address: "EQBLAU6roXjvk----eOdw_LHYrd8FQ8l_e5sU5tqDQEXIjIR",
          deploymentStatus: "completed",
        },
        {
          index: 350,
          address: "EQB3WRebchb3YYGEtwAjLEOFFw7hQaXkRJ9L6YDAtX8b02iw",
          deploymentStatus: "completed",
        },
        {
          index: 351,
          address: "EQBj4Q2Ohiu3EyiH0uJ-zC5Ej0mszMPw6HVlAlFxTaPiJ1f9",
          deploymentStatus: "completed",
        },
        {
          index: 352,
          address: "EQAc4rPqyBH1O9fRwjH5qIt8JeM1bmENDhB1UBM6HyeK1PIW",
          deploymentStatus: "completed",
        },
        {
          index: 353,
          address: "EQB2J0Qc60uxb8-eNlTS9uefhne4XxL8HPLKQ2-aK5ZKhJzL",
          deploymentStatus: "pending",
        },
        {
          index: 353,
          address: "EQB2J0Qc60uxb8-eNlTS9uefhne4XxL8HPLKQ2-aK5ZKhJzL",
          deploymentStatus: "completed",
        },
        {
          index: 354,
          address: "EQCgAS_Wq3xwEYLwUNbsd0LQhnVQpxs4IYoxTWQoZdpzWal-",
          deploymentStatus: "completed",
        },
        {
          index: 355,
          address: "EQAgTv3l1Y5jgonQNBzh-xSz1o6o0KBAbY4Hu8OA5aZxnEE5",
          deploymentStatus: "completed",
        },
        {
          index: 356,
          address: "EQDfq8AbNxXSJTnxyeAoyj-4D_mlKzvTrIZKse1PTjvC6qdf",
          deploymentStatus: "completed",
        },
        {
          index: 357,
          address: "EQC7W6dRv2CXOeSNUIimM-wDZHMYObK9XNlIlfXXVb7rd7dP",
          deploymentStatus: "completed",
        },
        {
          index: 358,
          address: "EQC251RMjyPYA2OAdTAiScyi-U8akLPhYxh2nOQ9Wd1SUHoh",
          deploymentStatus: "completed",
        },
        {
          index: 359,
          address: "EQCJqLN22_pOis7fZgWluexJs-XWtEk_MdGGP-y9FzJu9AHf",
          deploymentStatus: "completed",
        },
        {
          index: 360,
          address: "EQBz-MA-UeMb9rNBPKx71gE0kMd_0qydd51qxtJcqY4ET0GP",
          deploymentStatus: "completed",
        },
        {
          index: 361,
          address: "EQD0PR69CwUy1oUBriMVyUoVvVmqOq9hcodTXX_dBxS0D4Qi",
          deploymentStatus: "pending",
        },
        {
          index: 361,
          address: "EQD0PR69CwUy1oUBriMVyUoVvVmqOq9hcodTXX_dBxS0D4Qi",
          deploymentStatus: "completed",
        },
        {
          index: 362,
          address: "EQAYwae6-GwLZJ_qbc7l1riWPOtJRyf8jyaM_UyBcs-tIV0p",
          deploymentStatus: "completed",
        },
        {
          index: 363,
          address: "EQCPGIJKueWgqBQibh2BXYLe9Q-gag3mgrBrQqPUnr1jDGII",
          deploymentStatus: "completed",
        },
        {
          index: 364,
          address: "EQCErBPsUFoKFljz5SPqqF2CdsceYgnqs5YtJWR1sG9doYaG",
          deploymentStatus: "completed",
        },
        {
          index: 365,
          address: "EQDfZEFL1drnfvfJq_Siax2kIR7EC9TXp3DeW7e36Gp-8OW-",
          deploymentStatus: "completed",
        },
        {
          index: 366,
          address: "EQAK_3oKyQSzOwEicrxpSa24pIkCtC9T0SM3Uh65eA5iJE5j",
          deploymentStatus: "completed",
        },
        {
          index: 367,
          address: "EQC_6BfHSdUq3O69PR5-YuuX4eCXFD-ZU8NxJAOgmPei6iDK",
          deploymentStatus: "completed",
        },
        {
          index: 368,
          address: "EQBKyiYoqGCK182cn1yusWKgVfP4qzovQ3-_VykzoEb4CyoN",
          deploymentStatus: "completed",
        },
        {
          index: 369,
          address: "EQABBiwnSt7WE_l8UM1v4hg_q-4otN_Dbx7RzIF3DXAKmjGQ",
          deploymentStatus: "pending",
        },
        {
          index: 369,
          address: "EQABBiwnSt7WE_l8UM1v4hg_q-4otN_Dbx7RzIF3DXAKmjGQ",
          deploymentStatus: "completed",
        },
        {
          index: 370,
          address: "EQB0Rtr1djPTYRjcuwEnaMw5Wqj6DxGqmOgjf4dJ7RzL8-kJ",
          deploymentStatus: "completed",
        },
        {
          index: 371,
          address: "EQBUUxlpPmME40eFcBifvfO9HSJg46T8ZE_TO6Sbh3GcwcX6",
          deploymentStatus: "completed",
        },
        {
          index: 372,
          address: "EQCmGI3Wt5QO8djlj-dTjUggOzWs3vmLRy6-SZBxqZyN5zvk",
          deploymentStatus: "completed",
        },
        {
          index: 373,
          address: "EQDjENUF7kLykxoe5EC6Dd0CaTfsw-LexXqgsbQEgfrf0EH0",
          deploymentStatus: "completed",
        },
        {
          index: 374,
          address: "EQBUp3sdSNaOWFfQDPpKj3xp3STrTjGDU1TNFezj61ipinPB",
          deploymentStatus: "completed",
        },
        {
          index: 375,
          address: "EQD1tJ-3GuT2pzX2hdOl05Mvc_hyhpMEsXMxi8h_KR_CyaPm",
          deploymentStatus: "completed",
        },
        {
          index: 376,
          address: "EQDIGB-ALnceZ0kw150naI1eHRLliDzp1gM1O-dORSMypAdY",
          deploymentStatus: "completed",
        },
        {
          index: 377,
          address: "EQAE8zYnOORjSn784ZjIk-ja8n_FGMs9yWnx9Ex7VZ9U9Cx7",
          deploymentStatus: "completed",
        },
        {
          index: 378,
          address: "EQDLiOKddGL03truY-WdzlOfdoUcdww_6L_jk7IgGu6vatTx",
          deploymentStatus: "pending",
        },
        {
          index: 378,
          address: "EQDLiOKddGL03truY-WdzlOfdoUcdww_6L_jk7IgGu6vatTx",
          deploymentStatus: "completed",
        },
        {
          index: 379,
          address: "EQBUUI5zw39Tq9ze-NyNhCCs_hMtJ5mXOD5Zkk4BN2nVaE_9",
          deploymentStatus: "completed",
        },
        {
          index: 380,
          address: "EQAfYJRPa9c8dlbDd5ZBX64cTRJ5nKepMlT5KfjaUYFsbiRa",
          deploymentStatus: "completed",
        },
        {
          index: 381,
          address: "EQBncfq_69HtRVM5wGd74HCGYX_zQyyxyMAzcu3PRge3UOAE",
          deploymentStatus: "completed",
        },
        {
          index: 382,
          address: "EQC1jEGZYjsltoW2vAccUjpZyMq3vU6yuAV23n0ncLzbNG8y",
          deploymentStatus: "completed",
        },
        {
          index: 383,
          address: "EQDVDnopz_KcLPcy9aos4VnEt7LWSu4GE7qLAdMf_CyAgLBu",
          deploymentStatus: "completed",
        },
        {
          index: 384,
          address: "EQDJnoPgrFHgiyeTejb7XdnnQ8Fhtc6SbFXxtPKTtyrzMI9R",
          deploymentStatus: "completed",
        },
        {
          index: 385,
          address: "EQD8dPT8I0jgfWwCbCD9RpLoCUmbMuSfJQH88ug99KATT3jr",
          deploymentStatus: "completed",
        },
        {
          index: 386,
          address: "EQAf7vRMvbH8zqUbtZJY-AWbHnDhZt0wL_wkO7c6Mc3GR5in",
          deploymentStatus: "pending",
        },
        {
          index: 386,
          address: "EQAf7vRMvbH8zqUbtZJY-AWbHnDhZt0wL_wkO7c6Mc3GR5in",
          deploymentStatus: "completed",
        },
        {
          index: 387,
          address: "EQB_7wCVDL6YgnfsO9ikMPIKkYm2ePejxWFhutxxxK-eBU3a",
          deploymentStatus: "completed",
        },
        {
          index: 388,
          address: "EQCe2REsNcJCtuo4bR4spcxARlZbK_xyqKN2p8v2Rq2XCRSG",
          deploymentStatus: "completed",
        },
        {
          index: 389,
          address: "EQBXah8H2Ma2wg4xDl4jSpScSUsOxBYY-8ufKPxHwjKtitqk",
          deploymentStatus: "completed",
        },
        {
          index: 390,
          address: "EQCTwAar46HFXQIJ8Lo5se31tSrgsF_qnR2XsTx8kwE0zJ3Z",
          deploymentStatus: "completed",
        },
        {
          index: 391,
          address: "EQCxEVmQx0earVgvPBnwwDK7Iz016WH-elaNIIiBdot-Lemk",
          deploymentStatus: "completed",
        },
        {
          index: 392,
          address: "EQA7KrQ_ZQ8dj5IFDnjXwpwHShmpqJanHB-unkyYIduQqY_1",
          deploymentStatus: "completed",
        },
        {
          index: 393,
          address: "EQAg1m-OGrFNwoCcZJgNeTzmKad3ByrzSKVocKldqrpSGKoT",
          deploymentStatus: "completed",
        },
        {
          index: 394,
          address: "EQDYCjt4H6z3gVlK9DuWDr2m2Hzi_OyQcJ8JdBT-61h5xAQx",
          deploymentStatus: "completed",
        },
        {
          index: 395,
          address: "EQAOanvnJWDGEird_7y-LX1nCbksoDZtgD0Fhy7p2kuEoDMS",
          deploymentStatus: "pending",
        },
        {
          index: 395,
          address: "EQAOanvnJWDGEird_7y-LX1nCbksoDZtgD0Fhy7p2kuEoDMS",
          deploymentStatus: "completed",
        },
        {
          index: 396,
          address: "EQA6dFZzgdqB2nBaitQmtWDQv_l2n6PMX69_iPLlU5P6Syxm",
          deploymentStatus: "completed",
        },
        {
          index: 397,
          address: "EQBqjdmYwn3xECxjl2Yyn65GffZlsNjvGvUdbVywiCdO9QNe",
          deploymentStatus: "completed",
        },
        {
          index: 398,
          address: "EQCmKxR9twLZhWDVGITPJYO5glrJywvVHA-QUp0QhL7XCIpQ",
          deploymentStatus: "completed",
        },
        {
          index: 399,
          address: "EQBKW9qSJbQZOdFv9aWQKnJL7rT2SvIMNhgDB5741-tgcxXd",
          deploymentStatus: "completed",
        },
        {
          index: 400,
          address: "EQD1B8vq8UvHYCmJOiMkNwOT5uonXDlGwxDdI9CIcNPrmVbQ",
          deploymentStatus: "completed",
        },
        {
          index: 401,
          address: "EQAVNh8sqFP6qtvKOPIEaDO6Z6tcTR5NENjq2Wlf4rGIoTyw",
          deploymentStatus: "completed",
        },
        {
          index: 402,
          address: "EQAXzmaZGAqOE2BRrIFRWK1TtunnRTYNNckB3yMRdRpkIhwO",
          deploymentStatus: "completed",
        },
        {
          index: 403,
          address: "EQBm1j7yrWujAoe9piWkJeythRp7XEkoLQyE4iFfa-zahvKK",
          deploymentStatus: "pending",
        },
        {
          index: 403,
          address: "EQBm1j7yrWujAoe9piWkJeythRp7XEkoLQyE4iFfa-zahvKK",
          deploymentStatus: "completed",
        },
        {
          index: 404,
          address: "EQCTviHzPs-jEcxf_hJQEOylcbvKzQlaW5P04biOOUhnK6xg",
          deploymentStatus: "completed",
        },
        {
          index: 405,
          address: "EQCm_VkdopeaC9Xxy6OleZrI5gbff2tXlirwwaVx529p29CM",
          deploymentStatus: "completed",
        },
        {
          index: 406,
          address: "EQCoQP9qVc-Tm_t6ViPr0auLu18IdKhP542JXJIjQSJ4x8ll",
          deploymentStatus: "completed",
        },
        {
          index: 407,
          address: "EQD_SoJuQPqaZfFsICA-Ufy7070iAcETFlRu5cZdyyxj1YYQ",
          deploymentStatus: "completed",
        },
        {
          index: 408,
          address: "EQBHQ7IX6Zj-VeCwWyxcn4cZOimYpgdJCXa38aPkPBSYkFdR",
          deploymentStatus: "completed",
        },
        {
          index: 409,
          address: "EQCvHsN8_RY9tT7TXMoXp1SNgAd_cj-Kz8Z61dMZvoEStlFM",
          deploymentStatus: "completed",
        },
        {
          index: 410,
          address: "EQC7DQNfrV0dpoAV75uCZklCSUxdYt-ERJvb-FsDypvyV_RQ",
          deploymentStatus: "completed",
        },
        {
          index: 411,
          address: "EQAI8SRrDH8_z_7rme5NS287L7JaTgPx4rJuZ8Gjb4Jm5Pju",
          deploymentStatus: "completed",
        },
        {
          index: 412,
          address: "EQA8mBTn74fcNkFAOmK6KDKFcV5bn9ejhrU84Q055TYE6A1s",
          deploymentStatus: "pending",
        },
        {
          index: 412,
          address: "EQA8mBTn74fcNkFAOmK6KDKFcV5bn9ejhrU84Q055TYE6A1s",
          deploymentStatus: "completed",
        },
        {
          index: 413,
          address: "EQCKd923PKhmcAR59fS7jWqGiyZpc1qF4C9ScreeDHOOY4F2",
          deploymentStatus: "completed",
        },
        {
          index: 414,
          address: "EQAmDR9qAOeefmJfvK9J1JszjJr1v5lALq4SeyLS71V7SBbK",
          deploymentStatus: "completed",
        },
        {
          index: 415,
          address: "EQDclmeNG1jsonw2BAxY8-eCLYgr45FeRWupbbBNTL_B9Nyj",
          deploymentStatus: "completed",
        },
        {
          index: 416,
          address: "EQAyNfIaeblMXF7UcA-RBSre9TNdrrDEfv1rVA8VK4mXxhZS",
          deploymentStatus: "completed",
        },
        {
          index: 417,
          address: "EQBCZfACOLawpAP2VlvFtXi3T90kXkEBC5UDuad9Gv9V2szc",
          deploymentStatus: "completed",
        },
        {
          index: 418,
          address: "EQDuEBKJRVzXFvum1iIhtm4UBLhlSsptbZmiE9tdUHwQAOK8",
          deploymentStatus: "completed",
        },
        {
          index: 419,
          address: "EQAwMmdwGm4n8h0mKOWKfZ2Go5IgFSPuaaJqWVjmuToTQTzb",
          deploymentStatus: "completed",
        },
        {
          index: 420,
          address: "EQBSWkxlGsVTEbo_C6gtg5flGh6pZ69DhCs4gI5KoUCKu-Xj",
          deploymentStatus: "pending",
        },
        {
          index: 420,
          address: "EQBSWkxlGsVTEbo_C6gtg5flGh6pZ69DhCs4gI5KoUCKu-Xj",
          deploymentStatus: "completed",
        },
        {
          index: 421,
          address: "EQCtZTWfwN1x2UZrtyQLkybIJvEFSbiF9Fe7jDgm9M4n4wev",
          deploymentStatus: "completed",
        },
        {
          index: 422,
          address: "EQDOF6w9TO6qdCDHv3teH-AKJYxsxCad7aiZbvYw9NQUJVfV",
          deploymentStatus: "completed",
        },
        {
          index: 423,
          address: "EQB66usBvwZD0XsVdapxbl7eANJX_obijG_rr_YxS-gi68bR",
          deploymentStatus: "completed",
        },
        {
          index: 424,
          address: "EQCXqTwohGyEHr6URyVphO461B6-l7q49TBFaczJXMhqUshM",
          deploymentStatus: "completed",
        },
        {
          index: 425,
          address: "EQB1gwjnU-HhyFbvIVJdXaaZcbqBdol3W_fGown0O1BG2I89",
          deploymentStatus: "completed",
        },
        {
          index: 426,
          address: "EQB6nIXdyEO_74xUiNuyiHc7A4F7_lBdYM2IgjSa7vYJg9NA",
          deploymentStatus: "completed",
        },
        {
          index: 427,
          address: "EQAWwY-ew8X7kdCJkRTy6tiEisc4upozQuDTsE9VCtdfI-oW",
          deploymentStatus: "completed",
        },
        {
          index: 428,
          address: "EQAshTEdGX865h0qjaZwMtE_cru2CsibmG0r7Nc6bJ1FChgq",
          deploymentStatus: "pending",
        },
        {
          index: 428,
          address: "EQAshTEdGX865h0qjaZwMtE_cru2CsibmG0r7Nc6bJ1FChgq",
          deploymentStatus: "completed",
        },
        {
          index: 429,
          address: "EQD8qE-ybS-kycMa293OLgHlsBfgJ7hg44WzflPQPWDQ3gKZ",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "6.json",
      supply: 50,
      currentSupplyIndex: 50,
      copies: [
        {
          index: 430,
          address: "EQCQC0wW_sp5CqzK51GCNfCa6H3UsrbVOyKMQOHGb9VgFn-l",
          deploymentStatus: "completed",
        },
        {
          index: 431,
          address: "EQDvJKdL35jI2Xlk9ZmbJ2NHc5VuqkppOUJuRpH0PPVHPv3o",
          deploymentStatus: "completed",
        },
        {
          index: 432,
          address: "EQAP1aCM_n3ibTPyEIqBxji6QY4uZSt5tDYhsu-Y0axSRkky",
          deploymentStatus: "completed",
        },
        {
          index: 433,
          address: "EQAP1SBfFrb9I5-WJFzmakCQdbAiG-CJNu8mH-UC_TWlWD4t",
          deploymentStatus: "completed",
        },
        {
          index: 434,
          address: "EQByNaQvc3IjWzOY6A0L1MSx1lltCttxgr4mRMB7XvGPsj-o",
          deploymentStatus: "completed",
        },
        {
          index: 435,
          address: "EQAxf8y3H2xhw6YGit63jraETgVxkSGhRmcx4vzornBfbgA1",
          deploymentStatus: "completed",
        },
        {
          index: 436,
          address: "EQAYWoO4r0HYP86aYPY4ull9Nc8ARN2C6CfliKU755r3gatN",
          deploymentStatus: "completed",
        },
        {
          index: 437,
          address: "EQCtgUrxhabjIoM2Ce2ZRhGS3nXNyr-VQjvm5RDwVpaKAmvb",
          deploymentStatus: "pending",
        },
        {
          index: 437,
          address: "EQCtgUrxhabjIoM2Ce2ZRhGS3nXNyr-VQjvm5RDwVpaKAmvb",
          deploymentStatus: "completed",
        },
        {
          index: 438,
          address: "EQCUHJ7FWAtBgOSUidmGg1PISzIe4l27N5XH3_uNLJDP8rvk",
          deploymentStatus: "completed",
        },
        {
          index: 439,
          address: "EQCPvARbDPT0oXUsGUcmQyTCnNadMNWTm8tWVvEVqxAx1Vfa",
          deploymentStatus: "completed",
        },
        {
          index: 440,
          address: "EQCPpRP-5TYmRMmo6K3xupROPR1NLML_UNIb7lddnRRhwa_o",
          deploymentStatus: "completed",
        },
        {
          index: 441,
          address: "EQCzSCOHt9O2VEySTPi-h96VylqyPSUGlct8ny8RZKYxKWwy",
          deploymentStatus: "completed",
        },
        {
          index: 442,
          address: "EQApbPUnaEhHpZGXIvzAwoG2LtGyJkkyatU--9iMygkNzK-V",
          deploymentStatus: "completed",
        },
        {
          index: 443,
          address: "EQD_oQOZcR-UjEae0QCClxpJcW1j_qEJXhQKbwytxORXRHCY",
          deploymentStatus: "completed",
        },
        {
          index: 444,
          address: "EQBL1R50AD1uN5wPIrCNXbv77yOFM2H78SkABLm9oxrPtRs8",
          deploymentStatus: "completed",
        },
        {
          index: 445,
          address: "EQA43l0qqlksMq6j_B9LCnt17Hnw6b6sz6QxCoX3Hx8XJRxz",
          deploymentStatus: "completed",
        },
        {
          index: 446,
          address: "EQCY-lUhBBY2tDNuf_AH-5yyQr7g9d82I7gmrISSBtdVlSXl",
          deploymentStatus: "pending",
        },
        {
          index: 446,
          address: "EQCY-lUhBBY2tDNuf_AH-5yyQr7g9d82I7gmrISSBtdVlSXl",
          deploymentStatus: "completed",
        },
        {
          index: 447,
          address: "EQDPepVDEDn0CLLgQwnAkg5jLBhjTtKcqDrcRTuEo0jPVPPx",
          deploymentStatus: "completed",
        },
        {
          index: 448,
          address: "EQD2UWKwC_2xDmgxg8hvIXh0DYbbqLozR1seW_ZaWNKR175j",
          deploymentStatus: "completed",
        },
        {
          index: 449,
          address: "EQDeVdAhB_gGwFDm6iD7IH1kg8xHLUw3Dnr7I4hqqhYIfhFg",
          deploymentStatus: "completed",
        },
        {
          index: 450,
          address: "EQD4P38Ur6jalia4S01HBuaeNSOi6DAO9UvNdkHs2d0F0kuQ",
          deploymentStatus: "completed",
        },
        {
          index: 451,
          address: "EQCtSLhMmkGv7zAmgRlQUDvkDsN2P-y7T22_liOlXy4HE2rI",
          deploymentStatus: "completed",
        },
        {
          index: 452,
          address: "EQDJ90Fm1rfHowyvWtJCsufgSiM_ogxJ-NStbPwBTuSqutdQ",
          deploymentStatus: "completed",
        },
        {
          index: 453,
          address: "EQAjoHGuqa2feAxxhN6ane8FsAF4zgzif4ZzmJa86wgZlyUN",
          deploymentStatus: "completed",
        },
        {
          index: 454,
          address: "EQAVBHUwGXK-sMQZLomZruCzRLR0UtrtNCVRyL_0ut3cI66_",
          deploymentStatus: "pending",
        },
        {
          index: 454,
          address: "EQAVBHUwGXK-sMQZLomZruCzRLR0UtrtNCVRyL_0ut3cI66_",
          deploymentStatus: "completed",
        },
        {
          index: 455,
          address: "EQBDX-jc-kDzj6RbEFXeOsVOBE3TzQyrkkZwGQvKs6JeTHIt",
          deploymentStatus: "completed",
        },
        {
          index: 456,
          address: "EQDezX6T3oh9Ue9e9TKBu40wVKJuppGNG4JACB9qks9oaTQa",
          deploymentStatus: "completed",
        },
        {
          index: 457,
          address: "EQCF61KYFppepAtM_AodZfXO3VuxNiFRt9zz0zT_0MRLIoSc",
          deploymentStatus: "completed",
        },
        {
          index: 458,
          address: "EQAPQZ036KRh956lIlPngGt15Gu-J1S53_302ry38l9bOifC",
          deploymentStatus: "completed",
        },
        {
          index: 459,
          address: "EQC93KqYgDMKGb2NXAjCWiFhkkbZWigToPwB_IsZspIbDyl1",
          deploymentStatus: "completed",
        },
        {
          index: 460,
          address: "EQAY7UVNKc8pcUzzFIByawhceueUMiJsS31LUMevhgQ2bpMz",
          deploymentStatus: "completed",
        },
        {
          index: 461,
          address: "EQB1v-f-H2tXKRhN0H_wecwWHNer1B5mFhMHLwq2LTPVw7ou",
          deploymentStatus: "completed",
        },
        {
          index: 462,
          address: "EQDqgcVFD1rg_scgq6MwVJOEye3uNLYpX5Bi6Vkej0H-Bv_H",
          deploymentStatus: "pending",
        },
        {
          index: 462,
          address: "EQDqgcVFD1rg_scgq6MwVJOEye3uNLYpX5Bi6Vkej0H-Bv_H",
          deploymentStatus: "completed",
        },
        {
          index: 463,
          address: "EQCjHg0P2ftzHQdaoeguoXhGR3Wc-1d4I56hti7Ze5Jnfg2i",
          deploymentStatus: "completed",
        },
        {
          index: 464,
          address: "EQCNnKt3pylxOY5MrRW02uBc2z-EVhUHLQmRdSX27IZlTwDz",
          deploymentStatus: "completed",
        },
        {
          index: 465,
          address: "EQANk0A7txvaDJ4tL-Ad54SBf5FZYyXd54p5g5EUDyJLn8b6",
          deploymentStatus: "completed",
        },
        {
          index: 466,
          address: "EQCvPWHzAwrgYw2xUSjuHIOUPk5qSkPF5f9jXS6QZsVGGfjP",
          deploymentStatus: "completed",
        },
        {
          index: 467,
          address: "EQD7lrvpt_OgxnfAGD76zogS-ivWsf5FqDcO3cr8_k_uIuRV",
          deploymentStatus: "completed",
        },
        {
          index: 468,
          address: "EQC-kPT4gxmQ2wauQ1oafHkj6Q6U3QrRJYEBdbk8hixjnHjm",
          deploymentStatus: "completed",
        },
        {
          index: 469,
          address: "EQAlB29Gz0pFlqFMxZyI3ggEaN2PQ8AGwSEr2bgqDm_22W3w",
          deploymentStatus: "completed",
        },
        {
          index: 470,
          address: "EQDT9KOaAsHEm5h0VOc9MWlN7Ezd3vsb58nIgPUUDzY91mJE",
          deploymentStatus: "pending",
        },
        {
          index: 470,
          address: "EQDT9KOaAsHEm5h0VOc9MWlN7Ezd3vsb58nIgPUUDzY91mJE",
          deploymentStatus: "completed",
        },
        {
          index: 471,
          address: "EQCwQd8NMZoPtFkPGR7WJTAh_hxiMTejiV-BPLgfyGcnp0O-",
          deploymentStatus: "pending",
        },
        {
          index: 471,
          address: "EQCwQd8NMZoPtFkPGR7WJTAh_hxiMTejiV-BPLgfyGcnp0O-",
          deploymentStatus: "completed",
        },
        {
          index: 472,
          address: "EQAWtQtr2NAbTY0ppuKrg-mvxK2azWUYqYkX3jxg7YZyhClR",
          deploymentStatus: "completed",
        },
        {
          index: 473,
          address: "EQDBLsBt7l3h2qG-v_WVz_RnNMdoYFbVmsjw8pwLk0UrnARw",
          deploymentStatus: "completed",
        },
        {
          index: 474,
          address: "EQBaz-_a-noEB1BUtVFpX8ZtYIc_sPBWcTjcrflbB5HgCWQo",
          deploymentStatus: "completed",
        },
        {
          index: 475,
          address: "EQBzVcuwgUnkliikwB-fEQqZfhpS4Xub0GdZP-PT0cSFgTwW",
          deploymentStatus: "completed",
        },
        {
          index: 476,
          address: "EQDAHDJ8G0lh0A1NF5qZ2nnB7jBF3uRN9klSrRQpY4b6UkQa",
          deploymentStatus: "completed",
        },
        {
          index: 477,
          address: "EQDb0WOhNmcOH1R5zL5oEVIoNeG6ftsc4KqZMjWOnnbLhjw1",
          deploymentStatus: "completed",
        },
        {
          index: 478,
          address: "EQC7Hwq64R908g6Ymm0uerUbrF0tYt9mLFumkmEj4gmq1A5j",
          deploymentStatus: "completed",
        },
        {
          index: 479,
          address: "EQCi8tHlJzkMdyF-mCG3FqVZ_Hg7872urlGW-1y5v6-njksQ",
          deploymentStatus: "pending",
        },
        {
          index: 479,
          address: "EQCi8tHlJzkMdyF-mCG3FqVZ_Hg7872urlGW-1y5v6-njksQ",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "7.json",
      supply: 50,
      currentSupplyIndex: 50,
      copies: [
        {
          index: 480,
          address: "EQCJBkXlrRaZ3Dnsvpxpd2gldeBrARUKU4AhqbKWi51VbWbf",
          deploymentStatus: "completed",
        },
        {
          index: 481,
          address: "EQBc-7X9ufNQ1boUSWoyYTUFvva2GVdWysjJylkSeF3XxQMA",
          deploymentStatus: "completed",
        },
        {
          index: 482,
          address: "EQBKtsSG6IVOY-RoQFk_kvC8QclxFycn_l1tzwlbXLIg4NKU",
          deploymentStatus: "completed",
        },
        {
          index: 483,
          address: "EQCLH6RNUArMinVDxTFWe__gnm95t4J87j1fcI0NSXqrP1XK",
          deploymentStatus: "completed",
        },
        {
          index: 484,
          address: "EQB4W4Lijgrv_94cHpuvl-431fQyadQz-hdeRnvuizCRmyFu",
          deploymentStatus: "completed",
        },
        {
          index: 485,
          address: "EQAHNFv8fOe1pnCjcNthmjoKT5sCwFJziBOUKHiJnW__NF2P",
          deploymentStatus: "completed",
        },
        {
          index: 486,
          address: "EQDcaIgTdUTpr5V0Nq6E9f8-o5bhaZh-DzHe1Mm-UftPSAGP",
          deploymentStatus: "completed",
        },
        {
          index: 487,
          address: "EQBmFOhmidIdJfGnqJ5fgRLWL_mdjaGkAAZRUM2XoXfPThTE",
          deploymentStatus: "completed",
        },
        {
          index: 488,
          address: "EQCXRqADufHZvbvtVDmnPAwA_D8ZTt1QyhkD-0AFKojcq5x0",
          deploymentStatus: "pending",
        },
        {
          index: 488,
          address: "EQCXRqADufHZvbvtVDmnPAwA_D8ZTt1QyhkD-0AFKojcq5x0",
          deploymentStatus: "completed",
        },
        {
          index: 489,
          address: "EQAyiipq8oCoWMEkg5WCVZTmyvDsUlPqZeEg_tCJeyYvc_Be",
          deploymentStatus: "completed",
        },
        {
          index: 490,
          address: "EQDA7uc1sO4-PRZ3x3B3Z9AkVnDnAG09snDhHURJodiIwb2D",
          deploymentStatus: "completed",
        },
        {
          index: 491,
          address: "EQCB1kg5-ffzySsa8969Ng56vtYn9swkQDoHLAOKFD5Tk3Yw",
          deploymentStatus: "completed",
        },
        {
          index: 492,
          address: "EQDWNGDqQU6wFyexwVjcO0zcM-4NEGdf0DtQJdX4JhvdFEKD",
          deploymentStatus: "completed",
        },
        {
          index: 493,
          address: "EQASv2v24prFc9Nb6QwMKOrdt0ZRxcuDD3Iyb3GjLOnC7fZi",
          deploymentStatus: "completed",
        },
        {
          index: 494,
          address: "EQDU2X6o32mei4VaeRusDtqNhTSBgylMGc8H9xs3q4zCcuhW",
          deploymentStatus: "completed",
        },
        {
          index: 495,
          address: "EQAedjcdY4Pp-H-K0CYe_XskWnaTHPj8s_mX0f5Pi39eWzlg",
          deploymentStatus: "completed",
        },
        {
          index: 496,
          address: "EQCm8I7-v6XE0bBzrA4htqR2KLeWZ9ONM_GuX7xynyHw66cH",
          deploymentStatus: "pending",
        },
        {
          index: 496,
          address: "EQCm8I7-v6XE0bBzrA4htqR2KLeWZ9ONM_GuX7xynyHw66cH",
          deploymentStatus: "completed",
        },
        {
          index: 497,
          address: "EQA2H4_Ietbqv0EJaj3DPhW9m29zU1Zf7JXiURp93ihLkrWi",
          deploymentStatus: "completed",
        },
        {
          index: 498,
          address: "EQCngaKT_yFrykDbbGCIvqzbfJW7Gvu_PdrNpMNOaXCfsdTa",
          deploymentStatus: "completed",
        },
        {
          index: 499,
          address: "EQD6M91ZwL2-xsTGAsWB6ZtP360xc5DvXDmTCnttd6gDpLr8",
          deploymentStatus: "completed",
        },
        {
          index: 500,
          address: "EQClaKNmCPAqiGmiiELSBzGy6YkgWS_E86cyvHzEepTBKfG1",
          deploymentStatus: "completed",
        },
        {
          index: 501,
          address: "EQDxN7y2ckNeR-I8aVrvlXQepoxvE2zc3zT_Qpma-p3n-cZS",
          deploymentStatus: "completed",
        },
        {
          index: 502,
          address: "EQAx2uq20s-y4lnxrSo1Wdxecbw7UUo7M3YDewz5MHE0xe_7",
          deploymentStatus: "completed",
        },
        {
          index: 503,
          address: "EQBxST4bokDHoKQcHvwZv22btYs8sWGWOxXsemQVJ6_Z7DrZ",
          deploymentStatus: "completed",
        },
        {
          index: 504,
          address: "EQBuPYsoLxlTGOfrSaa7WcuGLWTdb9VUccwKHJ5XDxsBP-L_",
          deploymentStatus: "pending",
        },
        {
          index: 504,
          address: "EQBuPYsoLxlTGOfrSaa7WcuGLWTdb9VUccwKHJ5XDxsBP-L_",
          deploymentStatus: "completed",
        },
        {
          index: 505,
          address: "EQCBPF_57XR9gViorZp7lE1elZ55OHmcnNIb-y0q93TgnGPa",
          deploymentStatus: "completed",
        },
        {
          index: 506,
          address: "EQAhty3jqcv6uhFuaXXtkrL3Sw-IfwYocs1SW6IN7fyunh93",
          deploymentStatus: "completed",
        },
        {
          index: 507,
          address: "EQBcjppPAyv5xpB1RlEPunXYg26M6_fWaPn2YVMx0CYsIzg0",
          deploymentStatus: "completed",
        },
        {
          index: 508,
          address: "EQBRkRPU_VXU1viijy3i3nD3H3KKmGBAEYKgm9_zdBhbWrVx",
          deploymentStatus: "completed",
        },
        {
          index: 509,
          address: "EQAo-mbMpVpPOsVy7py1rP5hJ-JBTdQo-prIYgHf5Z2c_Jzh",
          deploymentStatus: "completed",
        },
        {
          index: 510,
          address: "EQCbYnqVqecl2WBdYhEdgi618PGqwcZVxZYwgF8gUGl2Llbp",
          deploymentStatus: "completed",
        },
        {
          index: 511,
          address: "EQBN-nFFTDyJxCeotSG-0jz0bXVmf5lleu2U1x5lJID33ZHV",
          deploymentStatus: "completed",
        },
        {
          index: 512,
          address: "EQBsrED2ab_myzJMJjx0xva6qPm2c5lJycbHS8UbVgBCUQ6n",
          deploymentStatus: "pending",
        },
        {
          index: 512,
          address: "EQBsrED2ab_myzJMJjx0xva6qPm2c5lJycbHS8UbVgBCUQ6n",
          deploymentStatus: "completed",
        },
        {
          index: 513,
          address: "EQC26XNrKRL5QNQsP1BkszwTeXO5ZwHr_JJ5ySkpUodlJTZo",
          deploymentStatus: "completed",
        },
        {
          index: 514,
          address: "EQCHpD0Ntk3xTmySTzkgB0H1eDBP_xLOg9mTm3GG0PvjyVJb",
          deploymentStatus: "completed",
        },
        {
          index: 515,
          address: "EQB0I6RNIhrIFlPOv7nqbMgguQ2bHF34woGC_921QC5U9ye9",
          deploymentStatus: "completed",
        },
        {
          index: 516,
          address: "EQB6vXA6Qq4AKCrO9ocB1G_BpQSPUngAMwEhsNtKQMe7cLgn",
          deploymentStatus: "completed",
        },
        {
          index: 517,
          address: "EQDr1BvoeF5jFk-Tzzw7slEnZ8CcrEM0NktHh-Sj-ohtpUfs",
          deploymentStatus: "completed",
        },
        {
          index: 518,
          address: "EQCyVMpuKr-Lz0ceCOqwybdYHTgETkjdEvZD6DbdNib86NEe",
          deploymentStatus: "completed",
        },
        {
          index: 519,
          address: "EQBkl0VRMK52gH-uFWjgQGsgEF0VsJoASSW8_fIBkT4dMjZV",
          deploymentStatus: "completed",
        },
        {
          index: 520,
          address: "EQCXvVJzJ9Mb-79e_ho6S3tU_U4F0BO4XSg7wxNrZ_8KjjMY",
          deploymentStatus: "completed",
        },
        {
          index: 521,
          address: "EQD5SdF6vGvpTvO3wg5KiLyyvKuhBNDDMfx1xwhIuB_DDY0X",
          deploymentStatus: "pending",
        },
        {
          index: 521,
          address: "EQD5SdF6vGvpTvO3wg5KiLyyvKuhBNDDMfx1xwhIuB_DDY0X",
          deploymentStatus: "completed",
        },
        {
          index: 522,
          address: "EQDQ00Y-pK3ueyBlDpcR9_QUphi1kO4InoTTaYozkXtdzVQF",
          deploymentStatus: "completed",
        },
        {
          index: 523,
          address: "EQDHeHVtbJo409WMgFyxloselk-pEBH2418mqYKzQfAip8ut",
          deploymentStatus: "completed",
        },
        {
          index: 524,
          address: "EQBEyWWxLciwyYXXocmekpf2SavqUwjfvMnq0O01YfdQr5le",
          deploymentStatus: "completed",
        },
        {
          index: 525,
          address: "EQAw9SWuARvxMyC9hCVwCNlR_5Nq22RQf6L10Ek30iTzqlIB",
          deploymentStatus: "completed",
        },
        {
          index: 526,
          address: "EQAZcCs8TZmg7eYEfOqJ_qpGPzJjlCAtRjZMKdDljszsRKCC",
          deploymentStatus: "completed",
        },
        {
          index: 527,
          address: "EQAn41PCrC9WMCv4G_TwHahx-KOXjcDALfDdreeU_PqXETMm",
          deploymentStatus: "completed",
        },
        {
          index: 528,
          address: "EQAzLt7EFQS56HlW07HEd3AiTB88U6FCq492UrrQOhhFLEc3",
          deploymentStatus: "completed",
        },
        {
          index: 529,
          address: "EQBQKREB_Co2AX1vAShxW6SmtRUyjtwGE5OpTS1qkRh9F39c",
          deploymentStatus: "pending",
        },
        {
          index: 529,
          address: "EQBQKREB_Co2AX1vAShxW6SmtRUyjtwGE5OpTS1qkRh9F39c",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "8.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 530,
          address: "EQASGLWtyrnJHFLcMK_ytHh4I3LbNxc0XZCpsySu4C9KNs4Z",
          deploymentStatus: "completed",
        },
        {
          index: 531,
          address: "EQCmvFVgW81k8QBUqQ8N3aV9zTDP69qdqUU3UKUIAHLzGFgw",
          deploymentStatus: "completed",
        },
        {
          index: 532,
          address: "EQA2Csn_09bEPmiRo75QZ8khtj1E8ovRr9c1j3yFg4izl1AR",
          deploymentStatus: "completed",
        },
        {
          index: 533,
          address: "EQDvUC28dfLvOdEsAyaSXMlja1ethjWFnOkILm_oHUGt3cZ-",
          deploymentStatus: "completed",
        },
        {
          index: 534,
          address: "EQB9WJ4dBcCnfvRsAQoIgNVz3nSInCqEZmE2X95K8sWVzt4X",
          deploymentStatus: "completed",
        },
        {
          index: 535,
          address: "EQB5G177A1M9exp2OtA5nL2NAf1wvuiCTcNJxCdGbyCC97dD",
          deploymentStatus: "completed",
        },
        {
          index: 536,
          address: "EQB42ayAL2QKyRSRa2TvmBN7mRvN0YbAomk_Xho7cWClDUE-",
          deploymentStatus: "pending",
        },
        {
          index: 536,
          address: "EQB42ayAL2QKyRSRa2TvmBN7mRvN0YbAomk_Xho7cWClDUE-",
          deploymentStatus: "completed",
        },
        {
          index: 537,
          address: "EQDseFP7JQJWhnp7MNBeHo8oEe-71B0SnOOsNZR05vRFyBxb",
          deploymentStatus: "completed",
        },
        {
          index: 538,
          address: "EQAsCkeVHN4KvsJJwYNcKlu3UhvRpY2lq69Nggujx2RCkH8u",
          deploymentStatus: "completed",
        },
        {
          index: 539,
          address: "EQAFgIIZsiiyLg4cdpsMfoiyv-VzlDLdWMvP1VykyLpogaLE",
          deploymentStatus: "completed",
        },
        {
          index: 540,
          address: "EQDh11xD1d5DHKItxtGpOG8k3YaPCT0siRupfhDmF2wkpxCh",
          deploymentStatus: "completed",
        },
        {
          index: 541,
          address: "EQAjyEpCa2W7qxnXBxMPXsyLRdRljLJbquoSe-Wvn_C0F_Qa",
          deploymentStatus: "completed",
        },
        {
          index: 542,
          address: "EQDzBEPgHmVWdxAHS7Z6bnNb4tRL8cavglNrKDbVNJyMnOMD",
          deploymentStatus: "completed",
        },
        {
          index: 543,
          address: "EQDWDLLoH57bWxoi0X2Uw6bVDRYPE4LJ--YnTqE4KGJReRll",
          deploymentStatus: "completed",
        },
        {
          index: 544,
          address: "EQC9t3OpnfpQOK--JAXwVkHCW8PKt_P1SdwUILNwtfBHlKjy",
          deploymentStatus: "pending",
        },
        {
          index: 544,
          address: "EQC9t3OpnfpQOK--JAXwVkHCW8PKt_P1SdwUILNwtfBHlKjy",
          deploymentStatus: "completed",
        },
        {
          index: 545,
          address: "EQBKzuOKFe4vl0vZo_ygwbJhWgnVhcAkiKlKwktqYSsMO4B6",
          deploymentStatus: "completed",
        },
        {
          index: 546,
          address: "EQAb4k8ILb1pMtOUtogfxNmiNKE8CpFLmnNUTzECDDP4TH8C",
          deploymentStatus: "completed",
        },
        {
          index: 547,
          address: "EQCJXtrAgUIMX-n8Fc7YH_q6Fu2qXE46vA17X_Ue3QG1Thd1",
          deploymentStatus: "completed",
        },
        {
          index: 548,
          address: "EQCNcF5WbAqP3rnO03noF6GkFlfv-SZZYXOsYybWzfN7FjY7",
          deploymentStatus: "completed",
        },
        {
          index: 549,
          address: "EQAj4Ve2L-KvK8ownQN94kPhI7nJA1Zj-eeGx8OQuy-JaFRv",
          deploymentStatus: "completed",
        },
        {
          index: 550,
          address: "EQD4IaBWdSUy1eDJyX0UjMBAqMKQl4NcIZyTXid-k28Zf6Xy",
          deploymentStatus: "completed",
        },
        {
          index: 551,
          address: "EQCaDqx2knlcdoPDmdRk7nCCdXn5VdT0wUyBH9F9HISrYq32",
          deploymentStatus: "completed",
        },
        {
          index: 552,
          address: "EQCiY-wvt8MnXXt8t1NQRKzFLLCXo6dV2qVUkgm02HaOESGh",
          deploymentStatus: "completed",
        },
        {
          index: 553,
          address: "EQBZjGGZoAmtFWepxH71QQSRBPuTYPUicanwhQtnUw3fUXMx",
          deploymentStatus: "pending",
        },
        {
          index: 553,
          address: "EQBZjGGZoAmtFWepxH71QQSRBPuTYPUicanwhQtnUw3fUXMx",
          deploymentStatus: "completed",
        },
        {
          index: 554,
          address: "EQD93gAFxBOgVdgXoDXh0V4mgmCSHyHI7xYpPGXGL4ij5976",
          deploymentStatus: "completed",
        },
        {
          index: 555,
          address: "EQAdgdbvdoSSX1KOrDzWSSKWzK-ZWEgNwVeI9_2F9Xshmkuv",
          deploymentStatus: "completed",
        },
        {
          index: 556,
          address: "EQC83XNGZA4yNp7Ln3srKSMQwTFmvO6k-lv4_IfGDg1vdspV",
          deploymentStatus: "completed",
        },
        {
          index: 557,
          address: "EQAcrajQp6B6rSEvvbBmxzyObn14B72TlG1ggdGNO1OZjdUo",
          deploymentStatus: "completed",
        },
        {
          index: 558,
          address: "EQBVOEn8nmBxXkMUmLuex44B6OJ1QcV8ad4zN7EJwUFryqoU",
          deploymentStatus: "completed",
        },
        {
          index: 559,
          address: "EQC6PEo9mnwUrbEsmishIQ2AC07uROkRYTWNsJn4zX7FSn9W",
          deploymentStatus: "completed",
        },
        {
          index: 560,
          address: "EQD80p7rxQyS0MhupkpkMuTOoKdymOZxd9OHW46Uokh83Sas",
          deploymentStatus: "completed",
        },
        {
          index: 561,
          address: "EQBYYFZbawM2HcXjhJSW0KYLWMyX9F6_mVmW_I_ke54dnzO4",
          deploymentStatus: "pending",
        },
        {
          index: 561,
          address: "EQBYYFZbawM2HcXjhJSW0KYLWMyX9F6_mVmW_I_ke54dnzO4",
          deploymentStatus: "completed",
        },
        {
          index: 562,
          address: "EQCXUl8F6TQIPj7_4LqTftj_b_F_HF9h-r5mgxSaJUyGqAQg",
          deploymentStatus: "completed",
        },
        {
          index: 563,
          address: "EQAae1O53F9sVvibe3ikPPlT85alnXXGbmN1fT_FoY6jYsCg",
          deploymentStatus: "completed",
        },
        {
          index: 564,
          address: "EQDYBF6EIcExMyR2NSIeXVVDOMysDagGIfdIhGzZ6p-_JOdN",
          deploymentStatus: "completed",
        },
        {
          index: 565,
          address: "EQDznjXYBLavboqM0xPS65lkf8s-fHctc1X7VhyFccTKq7MS",
          deploymentStatus: "completed",
        },
        {
          index: 566,
          address: "EQCOGkIUC7CSsnKHUyo0z69sSwhsbfp6QZyhaLVAorIpA6wW",
          deploymentStatus: "completed",
        },
        {
          index: 567,
          address: "EQA-AsW_4NsOErK2Kpq6ZZdUM8s8ss2HknerW2RxX6EORuE4",
          deploymentStatus: "completed",
        },
        {
          index: 568,
          address: "EQBRYLkJCVez4iG4s3mgt-eLPhFC6ZSoEKUJvL6-TN38wUft",
          deploymentStatus: "completed",
        },
        {
          index: 569,
          address: "EQCsFgxuRQrHPudIMNHCwDd576AqQIBZKftVyHP4_8nQnQc1",
          deploymentStatus: "completed",
        },
        {
          index: 570,
          address: "EQAxYP28Zgd6j2muqgn6k3mGOs--k2XIk78hd95kHMOjfZ1O",
          deploymentStatus: "pending",
        },
        {
          index: 570,
          address: "EQAxYP28Zgd6j2muqgn6k3mGOs--k2XIk78hd95kHMOjfZ1O",
          deploymentStatus: "completed",
        },
        {
          index: 571,
          address: "EQCHQsBEKmAvIUUMluoyxJNKGR32QThDf_QMs34W6GZ6Fb8m",
          deploymentStatus: "completed",
        },
        {
          index: 572,
          address: "EQCp3i72l3iMDX-gWc8igaSBSPEYngdEZ2xWQVlTUwunA7Im",
          deploymentStatus: "completed",
        },
        {
          index: 573,
          address: "EQBD2qO7Ixo01778hrnlFxZ7Kppn4kqOb018H3439x9Ahr0x",
          deploymentStatus: "completed",
        },
        {
          index: 574,
          address: "EQCqGrl2z3hQ7J5A0CJQYZur6wbR3c3PC2K52BPqQIJoC-qV",
          deploymentStatus: "completed",
        },
        {
          index: 575,
          address: "EQBX0LsyCjkenMGnLdlJ0O9OcvhkCzpGCCVcW-vTryNgir0W",
          deploymentStatus: "completed",
        },
        {
          index: 576,
          address: "EQAUVs-5LDtI3ziFeXjIT6rt1AdyP5hcDadL_rxtyjqcYU0Q",
          deploymentStatus: "completed",
        },
        {
          index: 577,
          address: "EQCqW-nQvMU5IEOeyRvTZ8nkmpbacOm1ahA_uUf41ZK0FnrX",
          deploymentStatus: "completed",
        },
        {
          index: 578,
          address: "EQBZDwWPXFXNanqZRZRBzdnwIpj7V92hzWCSKpE5YKKV8O3X",
          deploymentStatus: "completed",
        },
        {
          index: 579,
          address: "EQAH-1OWcWP7Twtybpn8Gojn1Ne11GFbEXaoppy0vUAc3I00",
          deploymentStatus: "pending",
        },
        {
          index: 579,
          address: "EQAH-1OWcWP7Twtybpn8Gojn1Ne11GFbEXaoppy0vUAc3I00",
          deploymentStatus: "completed",
        },
        {
          index: 580,
          address: "EQA1-vuMD2x4ke4-WKE1ukc-EUX8h4szXvoQNsrtrxBIrv_9",
          deploymentStatus: "completed",
        },
        {
          index: 581,
          address: "EQBdkqI34J4FEJg7GE9BdEcUWsxIJ0l8__EIfOeU4mpafVbn",
          deploymentStatus: "completed",
        },
        {
          index: 582,
          address: "EQDw60rPkUQW3TcC8r2kuCp07U_r_dL7rbP8g-B2Ph_xUG1-",
          deploymentStatus: "completed",
        },
        {
          index: 583,
          address: "EQB3zJDWbdZ-JXyTVY-q942s7NgDDwKct84nXZqrK8237LyF",
          deploymentStatus: "completed",
        },
        {
          index: 584,
          address: "EQBsHhtGD2EF2Q-c1acoohor9K_3WUFWWv9ihIcYgzsVeDJV",
          deploymentStatus: "completed",
        },
        {
          index: 585,
          address: "EQAOQFaQPQfVR8EcAya0jTgqj8ZuEhA5Ut4tgk8KOBIQopQ0",
          deploymentStatus: "completed",
        },
        {
          index: 586,
          address: "EQAXhZvFKlufYFYiqV-PhGRKAKSjKJkZ0rzGqm1hHWHjTN5J",
          deploymentStatus: "completed",
        },
        {
          index: 587,
          address: "EQDO9dg30V0cSx2d-F1BErYjCuja9O5fjwcjAtm_hEqFDJna",
          deploymentStatus: "pending",
        },
        {
          index: 587,
          address: "EQDO9dg30V0cSx2d-F1BErYjCuja9O5fjwcjAtm_hEqFDJna",
          deploymentStatus: "completed",
        },
        {
          index: 588,
          address: "EQA_APWjOURIKvm5njX1YN5ZPoZKeGv4emn7KMTMYVY6TptK",
          deploymentStatus: "completed",
        },
        {
          index: 589,
          address: "EQC0T1SOfulXFMD0ByL3SLkNBdE-LQzoS5fWQH6eXVlPbtfs",
          deploymentStatus: "completed",
        },
        {
          index: 590,
          address: "EQC3CguHYrd3E8qprO-QTUdtvwBH0mY-y_rwl-sXYPNIa00u",
          deploymentStatus: "completed",
        },
        {
          index: 591,
          address: "EQApALzoiCHU6Dt4pf2N8y5rd_HPizCykmWZtScMXQqjOelf",
          deploymentStatus: "completed",
        },
        {
          index: 592,
          address: "EQAsGwbwZ3HPjZyWzN_JdR6VTOZPknA_Dla-NVlIH342wtct",
          deploymentStatus: "completed",
        },
        {
          index: 593,
          address: "EQATPfzAsPVrAk2N3qX4fnF8f3c4AvjMZ9CF7RZqVBTdXeiD",
          deploymentStatus: "completed",
        },
        {
          index: 594,
          address: "EQAGUTVtDQmSGi7ioPjHhujUl8HEvq5tMVPsQgLkp_kg9PLA",
          deploymentStatus: "completed",
        },
        {
          index: 595,
          address: "EQBffLU3kGr-pM1OfGnjypGk2eExUZsOIAcu1iCwKRRy9S9C",
          deploymentStatus: "pending",
        },
        {
          index: 595,
          address: "EQBffLU3kGr-pM1OfGnjypGk2eExUZsOIAcu1iCwKRRy9S9C",
          deploymentStatus: "completed",
        },
        {
          index: 596,
          address: "EQDLMB16uJBLF7Qal6HYe1TNq-_0wqDMhY-BS6iFpxbXaF8t",
          deploymentStatus: "completed",
        },
        {
          index: 597,
          address: "EQDM4DGqVxhIwAeox7q8g_DK0WerhD3dQlLXfRJGuHDr0dob",
          deploymentStatus: "completed",
        },
        {
          index: 598,
          address: "EQApiDWgJU9il7n5e6QX3d2m5_U6ObFLQRNYd1YjGXq4vXQU",
          deploymentStatus: "completed",
        },
        {
          index: 599,
          address: "EQCNy9UEU6kW-GfAqQiwNI4fvsGjVnxpDliig509E-mekXxt",
          deploymentStatus: "completed",
        },
        {
          index: 600,
          address: "EQAbKKVC82a0xZdlpWHB6xwBk9t6k3nsaxH_y6j9vSm0_v1J",
          deploymentStatus: "completed",
        },
        {
          index: 601,
          address: "EQBDQVgt0LF1NLkWVBHfax25U0nC_CyTCsBtVQeNL0qPw7ZW",
          deploymentStatus: "completed",
        },
        {
          index: 602,
          address: "EQCP2bJaU6KJF0Rr-x8uXEUM9b-4pDiG3moD1g0rK6ONf0qE",
          deploymentStatus: "completed",
        },
        {
          index: 603,
          address: "EQC9l2u8qNayjssV8uBg7pFpCXIdt10w23kArhVfNbLE2Ten",
          deploymentStatus: "pending",
        },
        {
          index: 603,
          address: "EQC9l2u8qNayjssV8uBg7pFpCXIdt10w23kArhVfNbLE2Ten",
          deploymentStatus: "completed",
        },
        {
          index: 604,
          address: "EQBjUEeaB2mk_Z5NbfugBntvJTcMdw1OBXqVmaywEIpIfneR",
          deploymentStatus: "completed",
        },
        {
          index: 605,
          address: "EQCyImp1h5w05QOFvQATsl8L21fJJ1Z5P1UyfB6kX9Rn1ncs",
          deploymentStatus: "completed",
        },
        {
          index: 606,
          address: "EQCEkQXbQfYeoHCYEJCcoDAXx2XNNFg-5F31-J3c7SJRjkxz",
          deploymentStatus: "completed",
        },
        {
          index: 607,
          address: "EQADTx9hjIRqCUfU57ty-lY5lLkBSrvxlr5yACXx62_WqQbu",
          deploymentStatus: "completed",
        },
        {
          index: 608,
          address: "EQBIjCUxQuMOjSKp5vJxGwHnI35J2vVzPogLB4U2ph5et328",
          deploymentStatus: "completed",
        },
        {
          index: 609,
          address: "EQAt_VmZJqA9g_5V8x6MNr1LLtsp5ty_2HmtYwxf28rMH0wU",
          deploymentStatus: "completed",
        },
        {
          index: 610,
          address: "EQAqwXzvxCEOh34lpE5nzpVJ85hkVZkfxoPRDlseXet7UeVE",
          deploymentStatus: "completed",
        },
        {
          index: 611,
          address: "EQCHE_yXdrMqWVo2ExDRxaGv0E6N8kha9yVCvZuW2VxL1bcI",
          deploymentStatus: "completed",
        },
        {
          index: 612,
          address: "EQACzCeMppaqFIk8NGjkja41D54yFhS97zLomUiFz2US-wo0",
          deploymentStatus: "pending",
        },
        {
          index: 612,
          address: "EQACzCeMppaqFIk8NGjkja41D54yFhS97zLomUiFz2US-wo0",
          deploymentStatus: "completed",
        },
        {
          index: 613,
          address: "EQBqgjlgGQsyO0NApAWt1co0BXN_bP5C_k4aoGAW2407_6hV",
          deploymentStatus: "completed",
        },
        {
          index: 614,
          address: "EQC3hBtRianJ-BBCx9riZ8au7udqCoobJI2ldnj0ZrOIL_9_",
          deploymentStatus: "completed",
        },
        {
          index: 615,
          address: "EQAxa4_uuHoZy19CMhp_LrI2ikGKZBVfv5VEVie_8bgyMTOl",
          deploymentStatus: "completed",
        },
        {
          index: 616,
          address: "EQBWKQ9mw7npH2KK8nuptBcM0PStsFNXEgA2CpYv1T4Z6bEO",
          deploymentStatus: "completed",
        },
        {
          index: 617,
          address: "EQDvdXZAJ_OoFwVcMTS7w_3dTbU4u3qj-kDu_rhhsZ2ulk02",
          deploymentStatus: "completed",
        },
        {
          index: 618,
          address: "EQAEicp215DttZekAmu2kZj58aZKTbsKvlVBb8KQvgqDT6HC",
          deploymentStatus: "completed",
        },
        {
          index: 619,
          address: "EQA-m5Z_CWEm1tB9GqiI6gH5KZG4oKJxRGZomo23D1AFIBRf",
          deploymentStatus: "completed",
        },
        {
          index: 620,
          address: "EQA9EWyN4GE8aHGIw7xNql6z0JQ6x0r3Kwncv3KM9Qb7YCId",
          deploymentStatus: "pending",
        },
        {
          index: 620,
          address: "EQA9EWyN4GE8aHGIw7xNql6z0JQ6x0r3Kwncv3KM9Qb7YCId",
          deploymentStatus: "completed",
        },
        {
          index: 621,
          address: "EQDiXHzgR57zhaUkYeT0fqfQJ0Mx5B_ZTXI-MAm7O0QZ5lWm",
          deploymentStatus: "completed",
        },
        {
          index: 622,
          address: "EQCIloGfCBtj0CEw9IurOSO-fLTmdEajwUYgzzVp8I5eFI42",
          deploymentStatus: "completed",
        },
        {
          index: 623,
          address: "EQC8baMlw47NoazVfNQM2lzwzC-DAOh3IticJobZNIILtpAu",
          deploymentStatus: "completed",
        },
        {
          index: 624,
          address: "EQDEAssJ4XRcfWNRWvL9vzkJFEWnPrkeITcfiMbZIMtbII9Y",
          deploymentStatus: "completed",
        },
        {
          index: 625,
          address: "EQBG3wUdZwHd3D3QwuxJtiYjW0tXr_AEzLdc_jioX0ljY-c6",
          deploymentStatus: "completed",
        },
        {
          index: 626,
          address: "EQAgid17S8hk9MnBpjw5UcQazXX8cr9QqRIZvtcgywZNilSn",
          deploymentStatus: "completed",
        },
        {
          index: 627,
          address: "EQAjV31gdAkQR9k1sXXsrqy1_tvru8XyYul7EB7fF1AiNvj3",
          deploymentStatus: "completed",
        },
        {
          index: 628,
          address: "EQDDncG5fFMIeJTEfwgCPrihPc65TJgXvV9_Qmyh3nqNrsdq",
          deploymentStatus: "completed",
        },
        {
          index: 629,
          address: "EQDsXsm_oa5LRasXiVk79Xlto77wM86kvd278hyipX_g03Bq",
          deploymentStatus: "pending",
        },
        {
          index: 629,
          address: "EQDsXsm_oa5LRasXiVk79Xlto77wM86kvd278hyipX_g03Bq",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "9.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 630,
          address: "EQBbdVKvCm5k37sFapGNhOgpKKhNz4p0AAOLHNsoJh6V99ys",
          deploymentStatus: "completed",
        },
        {
          index: 631,
          address: "EQDhG59cyLmACkhpqKGb4X9WZmgQ9rtAwoIaAOPS5XCXBkMN",
          deploymentStatus: "completed",
        },
        {
          index: 632,
          address: "EQAV0Fx0Jzib8tIiAnoAO_UROOv9LHiH96mSSOcP435yitvT",
          deploymentStatus: "pending",
        },
        {
          index: 632,
          address: "EQAV0Fx0Jzib8tIiAnoAO_UROOv9LHiH96mSSOcP435yitvT",
          deploymentStatus: "completed",
        },
        {
          index: 633,
          address: "EQCkTEDGA3a78fh6nG1oFct9YTghXgGqnm5MclKQXerNk2g3",
          deploymentStatus: "completed",
        },
        {
          index: 634,
          address: "EQB5DimFrAqbaiJHg-hlos0cWSA5Bc1FT9qqvRRzLug4LPfK",
          deploymentStatus: "completed",
        },
        {
          index: 635,
          address: "EQB5wtU8Fl671_JOYRtpW7jadCOUEzyR0rvwJh_UudkhsFfl",
          deploymentStatus: "completed",
        },
        {
          index: 636,
          address: "EQC-cQBBAy5TGmPC5-p8fTvfg4IznLo8g-CuPKm89cwTFaX8",
          deploymentStatus: "completed",
        },
        {
          index: 637,
          address: "EQAmffASXm1wckCzQCrGlnIjj79O_gkMlo_enRUa0wyKPSnu",
          deploymentStatus: "completed",
        },
        {
          index: 638,
          address: "EQDZMkEuH7jsNzk8xRl38pT5e3HdEE94NcUWPXm7bhnaeulf",
          deploymentStatus: "completed",
        },
        {
          index: 639,
          address: "EQDE_IZz5BhF9WjZc_8pb1PETBKdY0FO7-NKFHOFSlyPUMOQ",
          deploymentStatus: "completed",
        },
        {
          index: 640,
          address: "EQCrUApSi2PaGW5kpIDA73xhAucTanpTSNaTpv_BXPHyfO8J",
          deploymentStatus: "pending",
        },
        {
          index: 640,
          address: "EQCrUApSi2PaGW5kpIDA73xhAucTanpTSNaTpv_BXPHyfO8J",
          deploymentStatus: "completed",
        },
        {
          index: 641,
          address: "EQBY9jeze8bnfnEJ9T-JRsOpX4BcCxScMqbIskSYGosQxnUc",
          deploymentStatus: "completed",
        },
        {
          index: 642,
          address: "EQDKqAZ_ns0iuSOFqXH2TWS_cqN-YDPMtRSmK-B6m_eU8A87",
          deploymentStatus: "completed",
        },
        {
          index: 643,
          address: "EQBFfOGiCFKI3n9yDC_XAByTiHNBQhmi1rZf6KlOQ5YC3f57",
          deploymentStatus: "completed",
        },
        {
          index: 644,
          address: "EQCaHdkYv8IV1O74hkuwSc24h3ctf2lcu3_Olo1YHBJm0z7D",
          deploymentStatus: "completed",
        },
        {
          index: 645,
          address: "EQAK_4FoyH8pUL5cq6nHKRRrkxw_SmZxiU0CFht5a9D5yH-c",
          deploymentStatus: "completed",
        },
        {
          index: 646,
          address: "EQA8vxbX0UREoX6Nvrg5vaXWPJpUyhvfKJP766Sh-xY85lgV",
          deploymentStatus: "completed",
        },
        {
          index: 647,
          address: "EQAJc5j4KU5z5EMwMUym5BOARDww0JvMFIlkeAKVIysOydPF",
          deploymentStatus: "completed",
        },
        {
          index: 648,
          address: "EQAQL9V4rgIpkv9Wx2e6CFcrhSnGevvmkyk6pLXuZJhFK9Mt",
          deploymentStatus: "pending",
        },
        {
          index: 648,
          address: "EQAQL9V4rgIpkv9Wx2e6CFcrhSnGevvmkyk6pLXuZJhFK9Mt",
          deploymentStatus: "completed",
        },
        {
          index: 649,
          address: "EQALaVilLHJZoTtwBSvazfMXKXBEyj4H4ZTKL25_3nccLW9X",
          deploymentStatus: "completed",
        },
        {
          index: 650,
          address: "EQAEXZW2_aXmIgIsFpM2yAE_Edqnym-xdYzi_CIy6ABQgJ1P",
          deploymentStatus: "completed",
        },
        {
          index: 651,
          address: "EQCSOXXCkZbqrDqy1OBJBVCiys853ezFl6TUCpPMRa4gTdvM",
          deploymentStatus: "completed",
        },
        {
          index: 652,
          address: "EQC6xaQBTBa7zHb5y87mY6jhXZTmHD12jf2Zi_a-Oj074m4b",
          deploymentStatus: "completed",
        },
        {
          index: 653,
          address: "EQABdGCKR9cOlLpf8IXCMjj5jrHJUt4QqPJHA8FUDvYzsl40",
          deploymentStatus: "completed",
        },
        {
          index: 654,
          address: "EQBPxnJOO9pOdgTq4w9f-b7zLP8rwx_MxSPqWh0d1rZUoC8p",
          deploymentStatus: "completed",
        },
        {
          index: 655,
          address: "EQDXbEwKROr-cnHKNeCsIBCL4Fti6yT-yVGRMWHGIVuDanUv",
          deploymentStatus: "completed",
        },
        {
          index: 656,
          address: "EQD_VZi85zXD-bh2mOq01EZAy9NXxgvo-ZY0onHk4PoN-myh",
          deploymentStatus: "completed",
        },
        {
          index: 657,
          address: "EQAE8FDJIdyBiUGqyCaNe60LmdI6QGNdvroyUuiA-To_XxPi",
          deploymentStatus: "pending",
        },
        {
          index: 657,
          address: "EQAE8FDJIdyBiUGqyCaNe60LmdI6QGNdvroyUuiA-To_XxPi",
          deploymentStatus: "completed",
        },
        {
          index: 658,
          address: "EQCA4R9q7yx1xya5JZi8toy0DUUKC6rKOs0VENDcMbBGvrMH",
          deploymentStatus: "completed",
        },
        {
          index: 659,
          address: "EQAN5_9QfKAFYk2IoffNjA0dSNVvH8Rcnm2VdiDfGU82FLMQ",
          deploymentStatus: "completed",
        },
        {
          index: 660,
          address: "EQBYjVQU0y_l0tnGyUWbPbXPto0XBf_ZhSBx9NtaH8CoBDiJ",
          deploymentStatus: "completed",
        },
        {
          index: 661,
          address: "EQDCbkqncL50NuVb2qGBARZZCgFB_6gPWzQngB6HBUI0AK8p",
          deploymentStatus: "completed",
        },
        {
          index: 662,
          address: "EQCAoiMZtvmLaEBkafLIHxRrNC--WPQHwlH1IiUursxMIihx",
          deploymentStatus: "completed",
        },
        {
          index: 663,
          address: "EQC3n0UEicBiWWkM-9lNe3vHPdCFIT-0yzi1bbq6Ecxr6X0u",
          deploymentStatus: "completed",
        },
        {
          index: 664,
          address: "EQBWR_a0LB_Il26kQ-OiqNAqMSC8qZlt6hbEVypM2t6K9Ddj",
          deploymentStatus: "completed",
        },
        {
          index: 665,
          address: "EQAuqvWPCTaWQMfAoWgUzpyip0oGHUD3oEOabqfhbHXqzk09",
          deploymentStatus: "completed",
        },
        {
          index: 666,
          address: "EQBEV7Bir6upl4l_lZvTPQydwWKyyKHSNlYQwxLtsYLTEB3K",
          deploymentStatus: "completed",
        },
        {
          index: 667,
          address: "EQB5RAa-RKFFdF2Fvs92ppNyfpwkf-V07BqsZVoX-eUm6fo7",
          deploymentStatus: "pending",
        },
        {
          index: 667,
          address: "EQB5RAa-RKFFdF2Fvs92ppNyfpwkf-V07BqsZVoX-eUm6fo7",
          deploymentStatus: "completed",
        },
        {
          index: 668,
          address: "EQD51pYsP1YVL0Ysc12Xf05ewIFQHtifTAo10TmJlXKjAhvX",
          deploymentStatus: "completed",
        },
        {
          index: 669,
          address: "EQAYfIeghvt6O2z7dMjUsghwQv5roT9ROZRc7e-wWleG_Wgw",
          deploymentStatus: "completed",
        },
        {
          index: 670,
          address: "EQDT05obpJx8xdVdy4KrNUH31ewoy-3gSJlqvdaML29T1j1x",
          deploymentStatus: "completed",
        },
        {
          index: 671,
          address: "EQBRTtCZU7YiHSRBBjVvKOrDufZ0uV7xBlCbj8AWfU6Ng3Wh",
          deploymentStatus: "completed",
        },
        {
          index: 672,
          address: "EQAn_7wtpzVK2lajEN-afHuQZYImr8X9LS_4AeiDpz7tWNOP",
          deploymentStatus: "completed",
        },
        {
          index: 673,
          address: "EQD5WI8eHwBOrm5ApK4XGQWr3GDn6vRmEoaRqgcG3oSzEKRo",
          deploymentStatus: "completed",
        },
        {
          index: 674,
          address: "EQCEACw0rlPqcKPDGbQILNMqnedlZkpgpO4fEm1ZdL3_wtXH",
          deploymentStatus: "completed",
        },
        {
          index: 675,
          address: "EQD4nt1PcUTj17E4fxV52RZZXdOk_IARFTb7KMfy-PVI41V-",
          deploymentStatus: "completed",
        },
        {
          index: 676,
          address: "EQCBtJaBjqj01E0FmMHF0dFCR96B5a-UtTI2uDrGcekp16wb",
          deploymentStatus: "pending",
        },
        {
          index: 676,
          address: "EQCBtJaBjqj01E0FmMHF0dFCR96B5a-UtTI2uDrGcekp16wb",
          deploymentStatus: "completed",
        },
        {
          index: 677,
          address: "EQCGVKljjxYvmT-BNBbUziQhSotIxJfasU_oP-ql5W5CN0GF",
          deploymentStatus: "completed",
        },
        {
          index: 678,
          address: "EQC8qVirL9olfWuk-S7gK2tYMXrZzAJwl3_9fPQJ14-MqBEu",
          deploymentStatus: "completed",
        },
        {
          index: 679,
          address: "EQB65vP_0QFKqH_NEYA3MZXmaHjVyVRCZ44KrZtfqZaD-LH-",
          deploymentStatus: "completed",
        },
        {
          index: 680,
          address: "EQCyQTSe7NuUfxYyb7R4cIEW0str69cjGZRWCF8zipS_oZUf",
          deploymentStatus: "completed",
        },
        {
          index: 681,
          address: "EQCWQukbWEk-s_LSzAS15S1LAmntV43BUf2yh7Dbmccjiyu2",
          deploymentStatus: "completed",
        },
        {
          index: 682,
          address: "EQCc2wxXQ8Frp6d5XXW05KjcJN3aQ_e3Wv44YKyLnYOH6L0e",
          deploymentStatus: "completed",
        },
        {
          index: 683,
          address: "EQD7-HDm9CS_LehPYSmQiqeXzypT9IG6AjKCMxz3E-4t-eO_",
          deploymentStatus: "completed",
        },
        {
          index: 684,
          address: "EQAoqRrfqxYXC8AydmMUyM1XYYrBs1y0-Att3M5hN_KpOLlx",
          deploymentStatus: "completed",
        },
        {
          index: 685,
          address: "EQBp9LPyKONe9eBj52GJHFO0O7NT_UnK57v4Yob8Fv_VKnWx",
          deploymentStatus: "pending",
        },
        {
          index: 685,
          address: "EQBp9LPyKONe9eBj52GJHFO0O7NT_UnK57v4Yob8Fv_VKnWx",
          deploymentStatus: "completed",
        },
        {
          index: 686,
          address: "EQCBM1JVBKihLIMmv4aGGy68mdECQWvNe08KLje4WNw99T6l",
          deploymentStatus: "completed",
        },
        {
          index: 687,
          address: "EQCj3WhesxbivtLk7jGoajD6E8PcJzpNd8KdQ_zEkAkqy0XH",
          deploymentStatus: "completed",
        },
        {
          index: 688,
          address: "EQDWLwm2jpVZRlT42eyyTlYdxrPptT2xljXHa0L7EtPvePT1",
          deploymentStatus: "completed",
        },
        {
          index: 689,
          address: "EQD70QcVcaP4JKvxvKGsa7R7mA7XTYejA41p5r4q6nXjgzC5",
          deploymentStatus: "completed",
        },
        {
          index: 690,
          address: "EQAx5mRvZEv9bfytoP2KxQNXLeupWnKd3wLUgLtL0AxfUoTk",
          deploymentStatus: "completed",
        },
        {
          index: 691,
          address: "EQBNP_AzxHNQ85wroSLw5sO_LrcQgeO7EUeVnve4zaWo0EKs",
          deploymentStatus: "completed",
        },
        {
          index: 692,
          address: "EQDvgi9grgGv364nidWr3W-fvdx44siuyZz2pnRak59o9Jqq",
          deploymentStatus: "completed",
        },
        {
          index: 693,
          address: "EQBLpdYjIDy5nUCvMI316ZAM-DiHKHy6S6ZaTmteppsIxdYb",
          deploymentStatus: "completed",
        },
        {
          index: 694,
          address: "EQAsw7mrlQ0MFQdA-DqmnvV_jADj4b4Wzb0tTvhr_hf9lRjK",
          deploymentStatus: "pending",
        },
        {
          index: 694,
          address: "EQAsw7mrlQ0MFQdA-DqmnvV_jADj4b4Wzb0tTvhr_hf9lRjK",
          deploymentStatus: "pending",
        },
        {
          index: 694,
          address: "EQAsw7mrlQ0MFQdA-DqmnvV_jADj4b4Wzb0tTvhr_hf9lRjK",
          deploymentStatus: "completed",
        },
        {
          index: 695,
          address: "EQCQJcG5NB8W23xMQ6CsqdoaNZIXmYAbj1TIXbxomflsiG3h",
          deploymentStatus: "completed",
        },
        {
          index: 696,
          address: "EQAg82-CFRvHzEZA0ZJq2GoAmq9UvoHgOZ5Qo9qicrLOajRG",
          deploymentStatus: "completed",
        },
        {
          index: 697,
          address: "EQCEClubXJ1hxENzwlWE-bW4JxkBI-fdwA6v8FGZuvGzjHbH",
          deploymentStatus: "completed",
        },
        {
          index: 698,
          address: "EQCE2uy-SmGF-uWqMedqHPvI0aJjXwlX49V2SkgBLIfxE3HX",
          deploymentStatus: "completed",
        },
        {
          index: 699,
          address: "EQDaUwpKDyDjqT4hRfobW5K-KHxTWU2SOhi-dcnKSShU2xW0",
          deploymentStatus: "completed",
        },
        {
          index: 700,
          address: "EQBOakafcL33_R0T7LsEtStH5kefhaLrGXry771BxBUoWDDF",
          deploymentStatus: "completed",
        },
        {
          index: 701,
          address: "EQDCT6C7b76lA7qBSoolZeUq_k-WPpA3Hu5-XQACx8Hz8Q7K",
          deploymentStatus: "completed",
        },
        {
          index: 702,
          address: "EQA5kU_WJOzdNyvw174vfdya8YiYuszGwfpVt4t57Kw578PD",
          deploymentStatus: "pending",
        },
        {
          index: 702,
          address: "EQA5kU_WJOzdNyvw174vfdya8YiYuszGwfpVt4t57Kw578PD",
          deploymentStatus: "completed",
        },
        {
          index: 703,
          address: "EQCBJ9Bu2DzNwhu5YiSXyrWjC6SMM0Q58img2nE-O6QvuvPg",
          deploymentStatus: "completed",
        },
        {
          index: 704,
          address: "EQBIrehbkxJ7biN4fTX-69i2Nsn7QJ3pb9FKMLjSTUmpexh7",
          deploymentStatus: "completed",
        },
        {
          index: 705,
          address: "EQCEYlyhMp703x5cjtToJeN3e8RfkSQGMlsoYxGsOEimvUI0",
          deploymentStatus: "completed",
        },
        {
          index: 706,
          address: "EQC8OywLYmrZ_XeM8CBwz1WI8TmQZ-nFmWsPfILx1e4Evigw",
          deploymentStatus: "completed",
        },
        {
          index: 707,
          address: "EQBuFY7eldTmmC6pUdVF0sZ1k4-BKMfZa2CRnzZbdKA7sLFv",
          deploymentStatus: "completed",
        },
        {
          index: 708,
          address: "EQAdHqnWTIkAVjRyd9f0UxrIe2XnWfApMfPqHTg9ZGBmXeZ5",
          deploymentStatus: "completed",
        },
        {
          index: 709,
          address: "EQAQc3IcHmCGuNMR4BHEUbkhPSvqiqi7viAgBiIpTA7eM9UH",
          deploymentStatus: "completed",
        },
        {
          index: 710,
          address: "EQB8gWao9Usbkp7RF0Yb6OS0PWVYiw6DS1zK8ZDsQVfTEeXY",
          deploymentStatus: "pending",
        },
        {
          index: 710,
          address: "EQB8gWao9Usbkp7RF0Yb6OS0PWVYiw6DS1zK8ZDsQVfTEeXY",
          deploymentStatus: "completed",
        },
        {
          index: 711,
          address: "EQDGSRLtuv1gmQy7DPpQJo1u1i8uZuDsmihGPVD_Iu0gUnYo",
          deploymentStatus: "completed",
        },
        {
          index: 712,
          address: "EQBeWF3FLlGc6fra6gCHuEGcSm156hDBVqyxLKSBKFCoE91F",
          deploymentStatus: "completed",
        },
        {
          index: 713,
          address: "EQDck5IJuPQb_qkKbLVP0iFam_ggqAEn5_EqiRzdxoV8q380",
          deploymentStatus: "completed",
        },
        {
          index: 714,
          address: "EQCYWVGACotCgKzReKlLq_kCzo-QmT_E0XFPXFd4yxYEWA0K",
          deploymentStatus: "completed",
        },
        {
          index: 715,
          address: "EQAYf9xIMR33QXH3RYAI1dJAJNKFwhINcSVIvvEQsQHc9UWu",
          deploymentStatus: "completed",
        },
        {
          index: 716,
          address: "EQDByFdxQmwUOqjiA3VkGZwr8iqlPVepBckm0FKQETUqXBn6",
          deploymentStatus: "completed",
        },
        {
          index: 717,
          address: "EQBre83-LSmXpzq_fpDw4AHhtUTa7neMNFGuKLWAS8fprvlV",
          deploymentStatus: "completed",
        },
        {
          index: 718,
          address: "EQCzHIDsMPg13AI_WhCKrzTmZqm-5ETERMKK_lQlgcljI-1g",
          deploymentStatus: "completed",
        },
        {
          index: 719,
          address: "EQCLkXCl7KZkGibLIILVscWDH8kN63mtcW7QavCpoXeBGTIj",
          deploymentStatus: "pending",
        },
        {
          index: 719,
          address: "EQCLkXCl7KZkGibLIILVscWDH8kN63mtcW7QavCpoXeBGTIj",
          deploymentStatus: "completed",
        },
        {
          index: 720,
          address: "EQCXtPJMh1MmnMFlnEV6OVfTFLkLYU74W-XG5jhLozV3tWew",
          deploymentStatus: "completed",
        },
        {
          index: 721,
          address: "EQCBCN91MMxLq7DshT1UDzJXn1rDgcCytFQUDPZf9Wq1pDjs",
          deploymentStatus: "completed",
        },
        {
          index: 722,
          address: "EQAKT9Umf4YNQkDC4b3PpmZi_-_mkKitj6nq7PcsQDKm-yHC",
          deploymentStatus: "completed",
        },
        {
          index: 723,
          address: "EQBuFCmXps6To06cxCMcXKtH0GRrrCMWLTzfgxfbBMHqbHF0",
          deploymentStatus: "completed",
        },
        {
          index: 724,
          address: "EQACCdwzWYX8Ev_ump3ToOr-Ur7fg4UquK4htwtM99AvHinf",
          deploymentStatus: "completed",
        },
        {
          index: 725,
          address: "EQA2u9EYPQQhseKQaAQ-8iT8zKgVCBnbaiPx9ppe2q1eEPBk",
          deploymentStatus: "completed",
        },
        {
          index: 726,
          address: "EQBFmevDBYjTQhFMgIjb7ZE8eaZkdZPngxAqfNsA2gdxVY5m",
          deploymentStatus: "completed",
        },
        {
          index: 727,
          address: "EQDLKZEYny1-gvP18oJVwzdkSz8bSBwKQPAU2ta7ook8jl3x",
          deploymentStatus: "pending",
        },
        {
          index: 727,
          address: "EQDLKZEYny1-gvP18oJVwzdkSz8bSBwKQPAU2ta7ook8jl3x",
          deploymentStatus: "completed",
        },
        {
          index: 728,
          address: "EQDoM0A3l3glaUpYsbgdJlgEWhS4e4anBE7ft68mPpAp9QKd",
          deploymentStatus: "completed",
        },
        {
          index: 729,
          address: "EQBY8pueQa852rEMR_wQVMZBhy-UBgQ0qT22hKbR2akWH4nB",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "10.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 730,
          address: "EQBm0YoH5gLlozoXWzEuLmjVXKE6OhzBiw293xNk-kdOX11k",
          deploymentStatus: "completed",
        },
        {
          index: 731,
          address: "EQD1mp4N3vsc2TaNPJR-ieH1n4a9DApWFbxsGECV5teKJ97T",
          deploymentStatus: "completed",
        },
        {
          index: 732,
          address: "EQBTYUhmKWqo5ZEuqi8dpNF9MJ4szRodQIly6AO2-cKjLfTh",
          deploymentStatus: "completed",
        },
        {
          index: 733,
          address: "EQBk0B4jSPj8clKqzZk0eHgLPbQepMeo2Lbo44gjIIwV9Q-x",
          deploymentStatus: "completed",
        },
        {
          index: 734,
          address: "EQBP2QC2KzJeBt0vx3nBoYvHFgI9rhRTLItTfias1BP8SMq3",
          deploymentStatus: "completed",
        },
        {
          index: 735,
          address: "EQANqg0xaXWtGYuiU6rs9WgrSRTM8Zl9Wc6kC_p2VIXkPcgx",
          deploymentStatus: "pending",
        },
        {
          index: 735,
          address: "EQANqg0xaXWtGYuiU6rs9WgrSRTM8Zl9Wc6kC_p2VIXkPcgx",
          deploymentStatus: "completed",
        },
        {
          index: 736,
          address: "EQD8Ov2YjZS9us6hM5g5D3aKZ2Ql9HRY1UCbJtlvx0uKAPfe",
          deploymentStatus: "completed",
        },
        {
          index: 737,
          address: "EQDIYsVbUuzbfkC8g1FuQA9Q60UwhiQVfKxvb0Zu7yhK2lXJ",
          deploymentStatus: "completed",
        },
        {
          index: 738,
          address: "EQD8yQ7dzKINzvKBBSmPrPdovm6YN6WX-ADTmVLaHrqEkHBA",
          deploymentStatus: "completed",
        },
        {
          index: 739,
          address: "EQDsEEEQTY8P0aTy20Gw4GLUB3a20aA-7Tx4C9Kow3Dl1BuD",
          deploymentStatus: "completed",
        },
        {
          index: 740,
          address: "EQAYkM20QY1bW0CEXC6fXqrTB3LdPJjjYEP4cv3rQaqABHtl",
          deploymentStatus: "completed",
        },
        {
          index: 741,
          address: "EQCzaRqT0VWyZPLcdQzHmyaM9EHIUlv_Ahmu96pQDEIHF6tm",
          deploymentStatus: "completed",
        },
        {
          index: 742,
          address: "EQDcNxkhRi833dthRHLBALO_3rSdzCr4pVWKclzriH4TfZ5C",
          deploymentStatus: "completed",
        },
        {
          index: 743,
          address: "EQC2xe2O5DKm7_KUZ6OgV5aLPTX8bDzSI5siZbChIh5pdmof",
          deploymentStatus: "completed",
        },
        {
          index: 744,
          address: "EQC49d0LsRkXN4YuEjI3nyq-EfIz4Cz8qg9JD4J-1eTHuqXU",
          deploymentStatus: "pending",
        },
        {
          index: 744,
          address: "EQC49d0LsRkXN4YuEjI3nyq-EfIz4Cz8qg9JD4J-1eTHuqXU",
          deploymentStatus: "completed",
        },
        {
          index: 745,
          address: "EQBtEz3DRhqr616zP3o90UP25huy3f1vayuGqsn-ItIvJHWc",
          deploymentStatus: "completed",
        },
        {
          index: 746,
          address: "EQCQvQKS6d9MDvY05vOo-jyzX_NfYdj5i5miKbNPe2SvdOPZ",
          deploymentStatus: "completed",
        },
        {
          index: 747,
          address: "EQDxpsYDG9VIjRlVqeGIu_kFmXnG20AEAGNozTq-97SFg7WI",
          deploymentStatus: "completed",
        },
        {
          index: 748,
          address: "EQB2QQt6iRvRLzjPVJcsy3DxhxwbMMjT45LzDVzTPpWcSxFf",
          deploymentStatus: "completed",
        },
        {
          index: 749,
          address: "EQCdCQzLnZ9ozJ_WzS3OMr6SRZhME947LoNwz9e3oKGDGWM7",
          deploymentStatus: "completed",
        },
        {
          index: 750,
          address: "EQC8jhqkCsLI7xDOGgz6vmD_JDa-wGHjLvqUZXuMuCBOz2cq",
          deploymentStatus: "completed",
        },
        {
          index: 751,
          address: "EQCqNiocYRJrN2w2hxG0sipwLvgHQMM1s-lTVWVOCip_wzo6",
          deploymentStatus: "completed",
        },
        {
          index: 752,
          address: "EQBNwH6yiwA7BtEKsh9WKXm7DRwzXjfBXURuGBOrjyjS6rgp",
          deploymentStatus: "pending",
        },
        {
          index: 752,
          address: "EQBNwH6yiwA7BtEKsh9WKXm7DRwzXjfBXURuGBOrjyjS6rgp",
          deploymentStatus: "completed",
        },
        {
          index: 753,
          address: "EQBvEsAeRJwJclAqEX3oP7WNxImEBxIzRv5ndwMY6iyoq7oj",
          deploymentStatus: "completed",
        },
        {
          index: 754,
          address: "EQABljiQ2a7Kz20VLwdb4mHStThA4ieSAzygQtN7UIAtAEk-",
          deploymentStatus: "completed",
        },
        {
          index: 755,
          address: "EQA9Hq-U_l6HMJyLAaM37vbF3EL5F8Lip03gUFbFLCypIuIF",
          deploymentStatus: "completed",
        },
        {
          index: 756,
          address: "EQDE9e1RPQ5WJ7X_V7qDkvftjzK1eV_pdn2zp41AfMCDyY5F",
          deploymentStatus: "completed",
        },
        {
          index: 757,
          address: "EQDJpFZScW0_j59s2ZYfgkpMR3tcWmoJEa5OvYeacENB0N7k",
          deploymentStatus: "completed",
        },
        {
          index: 758,
          address: "EQDBCBeZtRxPxGP8regHe18XGN7Y2LqJ3IfDIfx-YmZ6ZkZW",
          deploymentStatus: "completed",
        },
        {
          index: 759,
          address: "EQAz2zQTxBZbmHOEY6xMsQUPQZkR-VSs8k4KvdtVKZTXQNla",
          deploymentStatus: "completed",
        },
        {
          index: 760,
          address: "EQBnoAQfQUjt_gYZ17L-7CsnPx8Ka58vBiXMwiUOINErpB8T",
          deploymentStatus: "completed",
        },
        {
          index: 761,
          address: "EQAwFWNzEJQgCkN75b0JBSP6Jbl9lvZamIuJx3w6g5pfR6-k",
          deploymentStatus: "pending",
        },
        {
          index: 761,
          address: "EQAwFWNzEJQgCkN75b0JBSP6Jbl9lvZamIuJx3w6g5pfR6-k",
          deploymentStatus: "pending",
        },
        {
          index: 761,
          address: "EQAwFWNzEJQgCkN75b0JBSP6Jbl9lvZamIuJx3w6g5pfR6-k",
          deploymentStatus: "completed",
        },
        {
          index: 762,
          address: "EQADRQ4DMjz09WXo2R0ItmD7g3o1Nb17-IzhZvrwKTx4uMhv",
          deploymentStatus: "completed",
        },
        {
          index: 763,
          address: "EQCP14M93X6w8oYmR2b6VM0efGNZ_WxubhdYiksEsE2mbt_B",
          deploymentStatus: "completed",
        },
        {
          index: 764,
          address: "EQDgAwaN7TdQctf1vxodQk-93cr1Zz_0N8NvISulN-uDYwmI",
          deploymentStatus: "completed",
        },
        {
          index: 765,
          address: "EQDdlSYLl9Xq9eVlfFNWRT39VfHhiMBsQzSfb-NKUXT438VB",
          deploymentStatus: "completed",
        },
        {
          index: 766,
          address: "EQDp3_OQPG0VoRpSg28QjzImvHdHUfiTlbw6azQS5rCflbQJ",
          deploymentStatus: "completed",
        },
        {
          index: 767,
          address: "EQAniAoDNmBf55niC6vs8dVvBjnbu_uXBaDnA_PROGRXiMEm",
          deploymentStatus: "completed",
        },
        {
          index: 768,
          address: "EQCtm6rcwLYKvgrT8sZB3iIBJAHGV0NBl-dBI9bduViXh66r",
          deploymentStatus: "completed",
        },
        {
          index: 769,
          address: "EQBaWCa9z-77MivOzN-8f8f42NmbumfUm5jagZyVqhjsP069",
          deploymentStatus: "pending",
        },
        {
          index: 769,
          address: "EQBaWCa9z-77MivOzN-8f8f42NmbumfUm5jagZyVqhjsP069",
          deploymentStatus: "completed",
        },
        {
          index: 770,
          address: "EQApRzO6RnxLupVsDcgiwG-WIMOeKknMG5fuN2qNJVNmdLnq",
          deploymentStatus: "completed",
        },
        {
          index: 771,
          address: "EQBn6es5ImCM9JtXmS5svM-hlk0Hb5QC0jekBPYy0oerdu_b",
          deploymentStatus: "completed",
        },
        {
          index: 772,
          address: "EQBfT7yo59envNaIZgEokR5Y5Jmshqc-xgAAZkfPV98VRia_",
          deploymentStatus: "completed",
        },
        {
          index: 773,
          address: "EQDl-a8FRHvePYMI2fy9ExfRGZlhfUYYdRQhOaIWMA1_Fhgp",
          deploymentStatus: "completed",
        },
        {
          index: 774,
          address: "EQDU9g6lLwzW2BUGjsKwWeYcK4VSnw4qjd8SYLpmwXNTDsCG",
          deploymentStatus: "completed",
        },
        {
          index: 775,
          address: "EQDCNXtGBo0fA0DXvtl7u_7YQ5IR9emf6qqhJ9SdyuvZogmc",
          deploymentStatus: "completed",
        },
        {
          index: 776,
          address: "EQCCvyR22T0K9E0TQTrYPL7vJfH9HGxVIA8MEz8ePKCw1_sN",
          deploymentStatus: "completed",
        },
        {
          index: 777,
          address: "EQALhPJP7l7y3eHW0oo1iAMMq7xZQcQm3OSb35glChDqEphk",
          deploymentStatus: "completed",
        },
        {
          index: 778,
          address: "EQBKvYuZGAN9iyF8blZ4jzUqGPyxOW3yq5mJZn8mfzdvH5Cm",
          deploymentStatus: "pending",
        },
        {
          index: 778,
          address: "EQBKvYuZGAN9iyF8blZ4jzUqGPyxOW3yq5mJZn8mfzdvH5Cm",
          deploymentStatus: "completed",
        },
        {
          index: 779,
          address: "EQCZBKkHvrlku9XghxUM__ICf8tebM2yZUENczew5rDBqG0e",
          deploymentStatus: "completed",
        },
        {
          index: 780,
          address: "EQD5zlRWl-KV3nU-fOW89Jxh29qZdySE8voTLc5pQ4TJ6d4o",
          deploymentStatus: "completed",
        },
        {
          index: 781,
          address: "EQDeqNReXCmPxQXCWYYe5AvdDCIJUc37BZ4zHfwYgtRKDaw7",
          deploymentStatus: "completed",
        },
        {
          index: 782,
          address: "EQChlpG5YKWAe5jEt1EvM6kZYKjjEV-21q4lwDVkFpLXXXxm",
          deploymentStatus: "completed",
        },
        {
          index: 783,
          address: "EQBPWtAR2u_kJpX8NiRdUevtfkrBR4kvg26x4mOmyPon6xr7",
          deploymentStatus: "completed",
        },
        {
          index: 784,
          address: "EQBmogR6WiAJoQAmqIH2-pakHlj8aZ2qz9DhjLKorbympkjy",
          deploymentStatus: "completed",
        },
        {
          index: 785,
          address: "EQAnu21-rV4IKEDhteRgIXr334h9ZlWGlgN5AERLP-4qSOTe",
          deploymentStatus: "completed",
        },
        {
          index: 786,
          address: "EQDdj91koV9bZWXOexyNLbI70Suo6ShrSwifXUdoNmLccZns",
          deploymentStatus: "pending",
        },
        {
          index: 786,
          address: "EQDdj91koV9bZWXOexyNLbI70Suo6ShrSwifXUdoNmLccZns",
          deploymentStatus: "completed",
        },
        {
          index: 787,
          address: "EQD68MWgsUo3m7QNIT__U43L4CneB7or3J3jrYN9ERBCHDOv",
          deploymentStatus: "completed",
        },
        {
          index: 788,
          address: "EQC6Dg7lQbgG-093clwZ5FLaplYmkYlJTJtkHlAH5hPm2mqS",
          deploymentStatus: "completed",
        },
        {
          index: 789,
          address: "EQDnoOnYVO-Aml2p03RN-4SULgD0Bk3s2QUqS0s1fozsO3Fb",
          deploymentStatus: "completed",
        },
        {
          index: 790,
          address: "EQDPOGJ_v1bwqIRU6Sd9rbVvE1-puRyGYAETWHtjHnlnDKSG",
          deploymentStatus: "completed",
        },
        {
          index: 791,
          address: "EQCNUlaovq66a5MpvYSF-RFglUTFPGZphwn5coUsfKi-XtP0",
          deploymentStatus: "completed",
        },
        {
          index: 792,
          address: "EQC6szyp3JbkDy5XOlh17JVqTs6-8YKSMcMly_HI_rKBkwMb",
          deploymentStatus: "completed",
        },
        {
          index: 793,
          address: "EQDiRSScJ6fOZl2U31P9eKkJIZOazsA0PqDv2ePYen52puLv",
          deploymentStatus: "completed",
        },
        {
          index: 794,
          address: "EQB7JapdxzeVRj18rGcGye5cQsFTHQxNlgxys4tqD0FsDMOZ",
          deploymentStatus: "pending",
        },
        {
          index: 794,
          address: "EQB7JapdxzeVRj18rGcGye5cQsFTHQxNlgxys4tqD0FsDMOZ",
          deploymentStatus: "completed",
        },
        {
          index: 795,
          address: "EQBB72daj5H_QQh224bVcIXFp_zcdSx9zsNMYb4EgZG3zZcN",
          deploymentStatus: "completed",
        },
        {
          index: 796,
          address: "EQB0qzVpWDw7PnKoSyfhGkLkPgh6S8FreLEXeYfz8RgVMveg",
          deploymentStatus: "completed",
        },
        {
          index: 797,
          address: "EQABzfIzGeqnmY2r_2HI7RHIOGXt9EngKCWgiYSnwVZVh5Do",
          deploymentStatus: "completed",
        },
        {
          index: 798,
          address: "EQBVRNgTLFbEpUbPLMuu89cltXxk7Qai09x2ZB-fwRnXiwES",
          deploymentStatus: "completed",
        },
        {
          index: 799,
          address: "EQAEOXFUSve26_A3bZNY02zl_lDBGlV7E58NW_s3tNIdhE-w",
          deploymentStatus: "completed",
        },
        {
          index: 800,
          address: "EQABe1AlXOAZVyUXBRf46wV-q-NyK2YKi0NeNF3qPaTKrnEg",
          deploymentStatus: "completed",
        },
        {
          index: 801,
          address: "EQB7w-0tB2kcnYrXuN-ucDczjJVly0ryuzwOva_fz-jXphba",
          deploymentStatus: "completed",
        },
        {
          index: 802,
          address: "EQDa9vd_TUhRk1_XGMEaKsaDrf82Pr690EN1ULQ0fQzhgGPg",
          deploymentStatus: "pending",
        },
        {
          index: 802,
          address: "EQDa9vd_TUhRk1_XGMEaKsaDrf82Pr690EN1ULQ0fQzhgGPg",
          deploymentStatus: "completed",
        },
        {
          index: 803,
          address: "EQARQrjcSBw1fRv41auZwUkxPmKDxX6DmvvOQNEhbQiWuORr",
          deploymentStatus: "completed",
        },
        {
          index: 804,
          address: "EQACUEKi8gOqgedAwiptvUMUvBJ0aC65QrulfyJbLHdu4_fH",
          deploymentStatus: "completed",
        },
        {
          index: 805,
          address: "EQAk1ibL1-1bJp5aTv9zmtQtN9L15cmlU3-KINX9Fg9e4_0b",
          deploymentStatus: "completed",
        },
        {
          index: 806,
          address: "EQAElMccfQBe4T3R4hWbJMNyeInnSxBMXC6U5P3Nlt8bN5Ec",
          deploymentStatus: "completed",
        },
        {
          index: 807,
          address: "EQChDhtVZSQDW2tuL4x0AszopYzc2YPIGqFUcNzAvQ5MHZzr",
          deploymentStatus: "completed",
        },
        {
          index: 808,
          address: "EQAElHWZkZpypqWtPzHqpQ3L7le1eFIH0GgUPoBcvUgE1pn0",
          deploymentStatus: "completed",
        },
        {
          index: 809,
          address: "EQDr-bqwHuGF_9hftVwkOdSs0duLNUzi-_eO804f6lR0wXQj",
          deploymentStatus: "completed",
        },
        {
          index: 810,
          address: "EQB6w9qgfL8yjasxTyL_YNd1iteqo9YZJr-elCDrrm1-fDNc",
          deploymentStatus: "completed",
        },
        {
          index: 811,
          address: "EQAfgz8P9AZn-pEI6ywqZnaQOtlvhBM3BoGxgc5gO6EPpKJM",
          deploymentStatus: "pending",
        },
        {
          index: 811,
          address: "EQAfgz8P9AZn-pEI6ywqZnaQOtlvhBM3BoGxgc5gO6EPpKJM",
          deploymentStatus: "completed",
        },
        {
          index: 812,
          address: "EQCQru9IqiemYCYtz9XzP87x29dbNdF7_T3fWsOhAEJaP687",
          deploymentStatus: "completed",
        },
        {
          index: 813,
          address: "EQBF6CrHuy8XcGcWjhzKNvoYlMUeu3xFCPqXuaqAlpHPG8vV",
          deploymentStatus: "completed",
        },
        {
          index: 814,
          address: "EQBweLEDIJn2di2xzuKo13iPrymv_zcYy9tqHKciNOCty3-q",
          deploymentStatus: "completed",
        },
        {
          index: 815,
          address: "EQBt4g_G6S4T3GLQafd9_LoAqQwUOcAMrQQov7N8NkeEId00",
          deploymentStatus: "completed",
        },
        {
          index: 816,
          address: "EQBLcvC2KPqbMUjGG0ObMPBlNsRBqIpVINSxF7ApBRZ4mOxl",
          deploymentStatus: "completed",
        },
        {
          index: 817,
          address: "EQAKzjTot2Oneze-rMycBqWOx-sFSSY99PqQcQED8J15x_Lo",
          deploymentStatus: "completed",
        },
        {
          index: 818,
          address: "EQCUZ-pdd2V_AVvCHPX7x9prxzqecY5YbwOIIYN7JPrWNqc-",
          deploymentStatus: "completed",
        },
        {
          index: 819,
          address: "EQDYfnnfN6-I-ejCyhwjZWLq4h5WwYdQ8_1IlDwXm4Zo6yOo",
          deploymentStatus: "completed",
        },
        {
          index: 820,
          address: "EQDaLohQUpeMUKmE88u4spJryy_c93qnS0S2_jqNztA75seq",
          deploymentStatus: "pending",
        },
        {
          index: 820,
          address: "EQDaLohQUpeMUKmE88u4spJryy_c93qnS0S2_jqNztA75seq",
          deploymentStatus: "pending",
        },
        {
          index: 820,
          address: "EQDaLohQUpeMUKmE88u4spJryy_c93qnS0S2_jqNztA75seq",
          deploymentStatus: "completed",
        },
        {
          index: 821,
          address: "EQCVX5WHwzuaWlntJC6Nf43oqIJ4UqhKHLEAIE_yGh7T2QeC",
          deploymentStatus: "completed",
        },
        {
          index: 822,
          address: "EQDgSW9J-F5LjUeU9pTKqbb3FBh6zsdlRHkb5cl5chedjwvM",
          deploymentStatus: "completed",
        },
        {
          index: 823,
          address: "EQB1QKCUyNoKlr9tz1mE2NIn9Grsq-viOXtzYp7DXnCKdVJN",
          deploymentStatus: "completed",
        },
        {
          index: 824,
          address: "EQDVZAuUdp_LiIosjG1k0t-E4trmnWLq4Dw5ilgA6w7S_A7F",
          deploymentStatus: "completed",
        },
        {
          index: 825,
          address: "EQAaJnHVlY2DpoSGYunjmt4Je2veQQM5zjEU9sr7bLAxV6dZ",
          deploymentStatus: "completed",
        },
        {
          index: 826,
          address: "EQB5SQHCMuZwS9nk_IX11nRiKQG3x_kzUfLQ7kmOvujDaDa_",
          deploymentStatus: "completed",
        },
        {
          index: 827,
          address: "EQDlfQMjdqsCURzVjQyhdlVS-QWYsNajXBzQoAF7cB7tw-91",
          deploymentStatus: "completed",
        },
        {
          index: 828,
          address: "EQBFw8mnBWdiHEYIDHPlGkiiYpZ42F4OmU0OC1xFj7n1Cw0y",
          deploymentStatus: "pending",
        },
        {
          index: 828,
          address: "EQBFw8mnBWdiHEYIDHPlGkiiYpZ42F4OmU0OC1xFj7n1Cw0y",
          deploymentStatus: "completed",
        },
        {
          index: 829,
          address: "EQBGAvorYtNInWF-5s00GXDV4rTQ831kHBfvceRE9w0M5zYM",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "11.json",
      supply: 50,
      currentSupplyIndex: 50,
      copies: [
        {
          index: 830,
          address: "EQBaTo-8TNktKDkOvwVilWr2fsb33laZtmvwXg9UGtS8dcKT",
          deploymentStatus: "completed",
        },
        {
          index: 831,
          address: "EQBNgwXxW7EiZg8pZs3c5_WJ9KKiBZdK9N0bjIBhYGSmjb2J",
          deploymentStatus: "completed",
        },
        {
          index: 832,
          address: "EQBiKKWb4JHNmPjJOGBS3Trc_BYMEWXJ4E0_rN2sWuzl7E34",
          deploymentStatus: "completed",
        },
        {
          index: 833,
          address: "EQBLi-Y3IzJ46Qnf7zNCJsRJYqdvg9vz2dZROgtixsjEEU4K",
          deploymentStatus: "completed",
        },
        {
          index: 834,
          address: "EQDDur3vZn5xNExoeLR9965TeBMfZz-vZVtmTJBYhpMhQeb-",
          deploymentStatus: "completed",
        },
        {
          index: 835,
          address: "EQAhUDIpWPd0GmIaMvknkd7siqrW8P9Lgt-kyia13ST1Fckv",
          deploymentStatus: "completed",
        },
        {
          index: 836,
          address: "EQD2VfJdXwHDN1V0i6ArQRuT3C8XqCmAWqsMNVR4oRKCkXXX",
          deploymentStatus: "pending",
        },
        {
          index: 836,
          address: "EQD2VfJdXwHDN1V0i6ArQRuT3C8XqCmAWqsMNVR4oRKCkXXX",
          deploymentStatus: "completed",
        },
        {
          index: 837,
          address: "EQAFLgqwBG7cmKi36jJZFrVhH3MgFxEvUE1n6RGfgyszJHi9",
          deploymentStatus: "completed",
        },
        {
          index: 838,
          address: "EQBwvNrq4Oj0SdDoMHBQwNSZaBX1DbZNzOtJyRmbST-xZ1a0",
          deploymentStatus: "completed",
        },
        {
          index: 839,
          address: "EQCktVQDVeoLnCveheYBnWItR5sVmpMwPl3DpAiiYtvX_Fxp",
          deploymentStatus: "completed",
        },
        {
          index: 840,
          address: "EQCTh2pbPenn8ePvnbo-O9lp0yaX0iZvC97Y-WWcrexf8GDM",
          deploymentStatus: "completed",
        },
        {
          index: 841,
          address: "EQCSiWguxSKjVAYDeGueDgdjD5ism713FXQni9NQiFAvltjZ",
          deploymentStatus: "completed",
        },
        {
          index: 842,
          address: "EQDInJBErXO5RU8ks6S_5rKwrglpzdTws33jb2AGipho-FTA",
          deploymentStatus: "completed",
        },
        {
          index: 843,
          address: "EQBMAjcYYhN1rf53UVfonDAQ7p8MzItJKPqXh4ZhpXHuxtik",
          deploymentStatus: "completed",
        },
        {
          index: 844,
          address: "EQBIxcOxdsYLj1ayyRcdyoewWBzlXu_5FFz6h03xgCgE8zDd",
          deploymentStatus: "completed",
        },
        {
          index: 845,
          address: "EQCpAitjy0kfF8mCYliJXEuA9CL4dSPjx_4Gq3gs3YzdEGvM",
          deploymentStatus: "pending",
        },
        {
          index: 845,
          address: "EQCpAitjy0kfF8mCYliJXEuA9CL4dSPjx_4Gq3gs3YzdEGvM",
          deploymentStatus: "completed",
        },
        {
          index: 846,
          address: "EQAN1v8kf9D-Pr1UkTX0koZJvjN04xSQ3nluBu_b4zyaDX_0",
          deploymentStatus: "completed",
        },
        {
          index: 847,
          address: "EQAEbuGqPxvuQ2AT1N73V7CugRQl7EJZLqupe5_508LemWf8",
          deploymentStatus: "completed",
        },
        {
          index: 848,
          address: "EQAU0kps-MhgMqcwPf6kB_ts4E_1uZrB8kbmw-LyxJnUiM_W",
          deploymentStatus: "completed",
        },
        {
          index: 849,
          address: "EQC7GcCNo-IPEUi-IqPnl1md0IBmQr1jxA_aDSgKIWM_8FdY",
          deploymentStatus: "completed",
        },
        {
          index: 850,
          address: "EQAIegUj-VDo99JYmJteJMY-W0gGS5xmBOkWO_d9LKrqj1LN",
          deploymentStatus: "completed",
        },
        {
          index: 851,
          address: "EQDQxxdCwKcqJsZkyiHAEXM9aHeGIcDRvsyWt_tXXthziOT2",
          deploymentStatus: "completed",
        },
        {
          index: 852,
          address: "EQDejxeEsEhV62nJ6-K2teR_ib6X8dGIfiAzLoUkpOAjJcRS",
          deploymentStatus: "completed",
        },
        {
          index: 853,
          address: "EQAsDspmu7RiEv9R3A3G6Hz-4zl0VFOc_bgamDbtQa1UX-Y6",
          deploymentStatus: "pending",
        },
        {
          index: 853,
          address: "EQAsDspmu7RiEv9R3A3G6Hz-4zl0VFOc_bgamDbtQa1UX-Y6",
          deploymentStatus: "completed",
        },
        {
          index: 854,
          address: "EQA3IumAXfxU9cQe_GI3g6sBF1o7ysQukdVSkPtda9XzXOND",
          deploymentStatus: "completed",
        },
        {
          index: 855,
          address: "EQBHgqX6G-At5pL0zwuMnCgiaiEcmdtG2cG8wSDlf63OTjwC",
          deploymentStatus: "completed",
        },
        {
          index: 856,
          address: "EQAaaI8SzO7DeerH2UWDW3rrtPtJFRAYJfV6Kv8hQlPLG8bl",
          deploymentStatus: "completed",
        },
        {
          index: 857,
          address: "EQDTdLG3hU791xQM0rS0HHj7xmOSmiGKYx4dVQrnnADjHZvH",
          deploymentStatus: "completed",
        },
        {
          index: 858,
          address: "EQCDSXdcvMCzaUqmt52tQf6_Lgb9Tiwfm8wOExKW8mnWN26z",
          deploymentStatus: "completed",
        },
        {
          index: 859,
          address: "EQCEHTDRSKcKgmprsOvnIZJu_ZH9lDmn4JgyVNoHzRRgbfbb",
          deploymentStatus: "completed",
        },
        {
          index: 860,
          address: "EQBmiVbNkxWmjSOOxIMyrKsgUp23_YsAcIny2FMLosFTEiA3",
          deploymentStatus: "completed",
        },
        {
          index: 861,
          address: "EQDtMxvSnma4mQhIMt9R0sJwq6gPcsDpz1W3MmOj6xbAosYE",
          deploymentStatus: "pending",
        },
        {
          index: 861,
          address: "EQDtMxvSnma4mQhIMt9R0sJwq6gPcsDpz1W3MmOj6xbAosYE",
          deploymentStatus: "completed",
        },
        {
          index: 862,
          address: "EQD0DoutYAxsxrwIifO--fdBYUpYv6NKlQloJPGtNHAiJWLQ",
          deploymentStatus: "completed",
        },
        {
          index: 863,
          address: "EQDgma7pAE9X30Ei6i9TPXuHhMUfyiziOmtislW9D5P9AeOZ",
          deploymentStatus: "completed",
        },
        {
          index: 864,
          address: "EQAyT_1deYW6hVQJ_TAxJV35MZTsbAWlAyrcl3UanRznI346",
          deploymentStatus: "completed",
        },
        {
          index: 865,
          address: "EQBt1kS2RxnMwQzTO_3eIZFIqGxJ_vi3j7O1Mr6IzDWxGWgW",
          deploymentStatus: "completed",
        },
        {
          index: 866,
          address: "EQB9USniYPXabmLeDjfD-rPKGv8VulU6hJeegrJK4kiIv-z1",
          deploymentStatus: "completed",
        },
        {
          index: 867,
          address: "EQBOQv8i46Z6sohbohdMOcg1pjVc7h-j9K5hA46Mgb8uZ2iB",
          deploymentStatus: "completed",
        },
        {
          index: 868,
          address: "EQBBFlPTZ-bHzCyOaErPpFBUv6pxlwF1bgJexiDpFLmno6WD",
          deploymentStatus: "completed",
        },
        {
          index: 869,
          address: "EQAk7UvAeSNbHt1TJu7BDnJ6wNCUGBfrFOdtmYr7UuX5Qef1",
          deploymentStatus: "pending",
        },
        {
          index: 869,
          address: "EQAk7UvAeSNbHt1TJu7BDnJ6wNCUGBfrFOdtmYr7UuX5Qef1",
          deploymentStatus: "completed",
        },
        {
          index: 870,
          address: "EQCKtqCBOKxff7NY1ZMdoVPYcqCr1gbbtHxbv3OivsuMY5sF",
          deploymentStatus: "completed",
        },
        {
          index: 871,
          address: "EQACV1nMc0EPvYWcqSFUw0pOohquT_AMuR7pogg_ATejod2r",
          deploymentStatus: "completed",
        },
        {
          index: 872,
          address: "EQDsF2OpHJAe_b693mgNVMUidWuYOdI99elD6arvzKbFcaUJ",
          deploymentStatus: "completed",
        },
        {
          index: 873,
          address: "EQDW7rN7mpMSdGqzMRfebnnXrDKz6SeiuvXcWs2LI6IIYSHp",
          deploymentStatus: "completed",
        },
        {
          index: 874,
          address: "EQCtHESJPaz5OqKB306Z9oBRYN9DhkGkekl7aBssnH6HYa2Q",
          deploymentStatus: "completed",
        },
        {
          index: 875,
          address: "EQB0UkjhrOm6nrpoaEhXdNYz45HBSUQz-VBDstFNP6lvos1g",
          deploymentStatus: "completed",
        },
        {
          index: 876,
          address: "EQDgYpPQVw_6strlA5yP1COsTKi1cllKZf7hHwPPZGZCaP4T",
          deploymentStatus: "completed",
        },
        {
          index: 877,
          address: "EQApBKabcLbvQFdPI6Ms9A9t9XmsvYoAOt0qjgfKZmJT_mFO",
          deploymentStatus: "completed",
        },
        {
          index: 878,
          address: "EQAXpHeOPlMsHCOWQZEdXp03_ImyIPm9t_HZnePDYm4YKWnU",
          deploymentStatus: "pending",
        },
        {
          index: 878,
          address: "EQAXpHeOPlMsHCOWQZEdXp03_ImyIPm9t_HZnePDYm4YKWnU",
          deploymentStatus: "completed",
        },
        {
          index: 879,
          address: "EQAlQBJjtcNfJ6MJBeFJUDTKDvFYn15MzZhweikERyLR3RlR",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "12.json",
      supply: 30,
      currentSupplyIndex: 30,
      copies: [
        {
          index: 880,
          address: "EQCZ4W9EyK85IEjlHv3ZJ7tySkP9W9rK-9xr7IM6hUWTQu7f",
          deploymentStatus: "completed",
        },
        {
          index: 881,
          address: "EQCSEC02pXLkj3rUIxnnCLob6E2v4oUD-R4MtATASBOnPZIo",
          deploymentStatus: "completed",
        },
        {
          index: 882,
          address: "EQDkirutZT_PpT-YasM-GVKv59kelr4XRv1iVn6LChwwYNqq",
          deploymentStatus: "completed",
        },
        {
          index: 883,
          address: "EQAnBeh0FKjpIqBRKjiSFQstN8qjEfOKcFKSCL9UjcHVOxoU",
          deploymentStatus: "completed",
        },
        {
          index: 884,
          address: "EQAxexjcxI3kJWpyB07cP3KetQ4La_9HvQrOZtfDUr1XD33_",
          deploymentStatus: "completed",
        },
        {
          index: 885,
          address: "EQBrFE2bsYk2LMY8zZhSBVz5QOXqhOcszLIxNo1jsqeE5Cj0",
          deploymentStatus: "completed",
        },
        {
          index: 886,
          address: "EQCeHqvwxxOYLVQCRztg13U6_bqKokXYY5au-Dj0YDYmqyME",
          deploymentStatus: "completed",
        },
        {
          index: 887,
          address: "EQCkmmv9pU-Mv_vafeBCsDK44yyPYLU5lUNOoquZ0crOtMtT",
          deploymentStatus: "pending",
        },
        {
          index: 887,
          address: "EQCkmmv9pU-Mv_vafeBCsDK44yyPYLU5lUNOoquZ0crOtMtT",
          deploymentStatus: "completed",
        },
        {
          index: 888,
          address: "EQDvBNnlpyWnkFWLNzqJYl7beBkmKhzERq9sJoAzbQXBkZ2t",
          deploymentStatus: "completed",
        },
        {
          index: 889,
          address: "EQDMbSJ81abTLLlDZJEHEjCHCjK87iQRX4qPL2_YCqHzS6K6",
          deploymentStatus: "completed",
        },
        {
          index: 890,
          address: "EQDtuJMS5NY2SR0JSn0We2Fo03ehjGmEv1UfLgYayj5Lo1hL",
          deploymentStatus: "completed",
        },
        {
          index: 891,
          address: "EQDbTzQeDHaV-fpXDwQzITy_PPk3uTeYp4DPrFqDQpwLc_u7",
          deploymentStatus: "completed",
        },
        {
          index: 892,
          address: "EQCAQR2j_w1ow3NNCiFieDK1nJJnITtcX_NdrCt_s7xX1Nto",
          deploymentStatus: "completed",
        },
        {
          index: 893,
          address: "EQD_-MPvbU24EAS6bSPbOoRSjqf9hlVowGZ3mnzVSGGNo70e",
          deploymentStatus: "completed",
        },
        {
          index: 894,
          address: "EQDdKGSWU6aLQjSd2gDX6u49wwBWVhxRgA1MV8qnRdGfCqCj",
          deploymentStatus: "completed",
        },
        {
          index: 895,
          address: "EQAUG7P4LKIgrF2o5ktxLiYd8oVXc4O45sObOa36naRKTkux",
          deploymentStatus: "pending",
        },
        {
          index: 895,
          address: "EQAUG7P4LKIgrF2o5ktxLiYd8oVXc4O45sObOa36naRKTkux",
          deploymentStatus: "completed",
        },
        {
          index: 896,
          address: "EQBaYxxKCn5FG2qsjEURdUsehv-OrU-CaqkTg7jHWos0Uhvi",
          deploymentStatus: "completed",
        },
        {
          index: 897,
          address: "EQAeVdHU0SMfrD7i4yTybUfH9y3K1BvrTkdwpTXTN2bscAIJ",
          deploymentStatus: "completed",
        },
        {
          index: 898,
          address: "EQBZOqc24yla7BG-ivlMN7nN36tBQQ648g2pqI_aIgUj0mWf",
          deploymentStatus: "completed",
        },
        {
          index: 899,
          address: "EQCWfEAbhsMv343u_iZhignpToA5UedqLyYgNp23h8VWiyDc",
          deploymentStatus: "completed",
        },
        {
          index: 900,
          address: "EQBkP_5NjTZI6Vbg9l3DuBtwzoNI-5l1qfyT-FX-AAHPR6Nu",
          deploymentStatus: "completed",
        },
        {
          index: 901,
          address: "EQC2OhfCYVcrSTUG2cRRglHHy17rPUZ8ciOd1CKw9UDjtd7H",
          deploymentStatus: "completed",
        },
        {
          index: 902,
          address: "EQAbb8VQbS-Rf74xnJE4GKkG_EsZRvpX415MpwBF53rqBCYV",
          deploymentStatus: "completed",
        },
        {
          index: 903,
          address: "EQDBFZgaCvKvT1qx4zgkdzwvkZbohrkau8px0D4xEIYvfyem",
          deploymentStatus: "completed",
        },
        {
          index: 904,
          address: "EQC40xaK1CWMvP6jr-CNBIwJYsXIzEoJa6Aagus-8TfBXpNm",
          deploymentStatus: "pending",
        },
        {
          index: 904,
          address: "EQC40xaK1CWMvP6jr-CNBIwJYsXIzEoJa6Aagus-8TfBXpNm",
          deploymentStatus: "completed",
        },
        {
          index: 905,
          address: "EQBLLdaKyEvlkH0qJShHIj9bcAyBVwkCvBq_BZSkHlc24bQd",
          deploymentStatus: "completed",
        },
        {
          index: 906,
          address: "EQBgHDUNJnc3udW73aHbActXHqtA19VxLu8QKcrF8pPO9DLJ",
          deploymentStatus: "completed",
        },
        {
          index: 907,
          address: "EQBdlpmFVvpbjXzHQ30ND5Ettxh4h1xo6Ozx0ljejR9qu4X8",
          deploymentStatus: "completed",
        },
        {
          index: 908,
          address: "EQDcJ8T7G-sKNKPC_RaBHPDyGMNyXIIdPQ8o7iJvb5MWmFIW",
          deploymentStatus: "completed",
        },
        {
          index: 909,
          address: "EQC_tfPqVfpjScDlpfcrFbzYZtil0ReG8WrcTixVeWcVWgAZ",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "13.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 910,
          address: "EQBUt1S-INeqO_ip2MA4dmna5g12CE9ndp7P9xvFNTGwFgaL",
          deploymentStatus: "completed",
        },
        {
          index: 911,
          address: "EQCS5HdvYAT_ZmwLEwqZaScAeZAGAN0_-dl6V_poj_P0p_RD",
          deploymentStatus: "completed",
        },
        {
          index: 912,
          address: "EQCW5eS433V-01fL8_bySW-S1pAL1aaUKL2BL9AEGBInqBRM",
          deploymentStatus: "pending",
        },
        {
          index: 912,
          address: "EQCW5eS433V-01fL8_bySW-S1pAL1aaUKL2BL9AEGBInqBRM",
          deploymentStatus: "completed",
        },
        {
          index: 913,
          address: "EQBvDPGpXJEYKq9AzQGoG7HELwygEqodJUOwih4FZJhPAAYd",
          deploymentStatus: "completed",
        },
        {
          index: 914,
          address: "EQDfg72AVnP1hQVoDARAT5RPYO3gPVO16-LxoeLbylF_gu5Q",
          deploymentStatus: "completed",
        },
        {
          index: 915,
          address: "EQAixSTgZlXN9_sH2yZeUkq6wkJyFjX3k4yUHWAnlpw1_tIz",
          deploymentStatus: "completed",
        },
        {
          index: 916,
          address: "EQBzOhEbXlhz7_ENnPLGBwKcraCuZlIqRSedcZA3nrhkJVru",
          deploymentStatus: "completed",
        },
        {
          index: 917,
          address: "EQDCgDiSYEhKRAkPpw_kaeb8iFeleVJtTPiva3wOpAbT8f_q",
          deploymentStatus: "completed",
        },
        {
          index: 918,
          address: "EQDsNUbItz7wUsiE6HyMnu6s_5nu2jwxoZv2MTedEHultyMu",
          deploymentStatus: "completed",
        },
        {
          index: 919,
          address: "EQAU23XWX9noFctgUpu46W-poxu_WgsE7cXjZcv5AgF5u3nL",
          deploymentStatus: "completed",
        },
        {
          index: 920,
          address: "EQC5l8GJpe9gxwMsoBo2rYKMSQIClS2ojEcI7olu-C1h1NnQ",
          deploymentStatus: "completed",
        },
        {
          index: 921,
          address: "EQCF713ycPLYM-_cw1mwymIKmJ0Mmy-sDDd_C2LtWYclZjXH",
          deploymentStatus: "pending",
        },
        {
          index: 921,
          address: "EQCF713ycPLYM-_cw1mwymIKmJ0Mmy-sDDd_C2LtWYclZjXH",
          deploymentStatus: "pending",
        },
        {
          index: 921,
          address: "EQCF713ycPLYM-_cw1mwymIKmJ0Mmy-sDDd_C2LtWYclZjXH",
          deploymentStatus: "completed",
        },
        {
          index: 922,
          address: "EQBpUfrQN26PyxD0PA3Cac3xDPBzdfJru0-mUmvg6W3OtSzj",
          deploymentStatus: "completed",
        },
        {
          index: 923,
          address: "EQA_EeFGuGHIWZmWIpAsXZjxG0S0E12FBoGrHANkgFE1tf6K",
          deploymentStatus: "completed",
        },
        {
          index: 924,
          address: "EQByQ3TIBPZHd6cSkGPkk66JaM9xaulp7gNUhnANRTj-CKnK",
          deploymentStatus: "completed",
        },
        {
          index: 925,
          address: "EQA6juH_6Z87Y6MZg9LQAsGzxZxv5ZHYJE00hE4ImYEUeY7q",
          deploymentStatus: "completed",
        },
        {
          index: 926,
          address: "EQCkQLziynvvXbFJdB56tZdnNnvW1LEvuNlegGTY_yJ4AaMQ",
          deploymentStatus: "completed",
        },
        {
          index: 927,
          address: "EQB767YG6WWAD98W1y5FbTKEBNmZwLwcs452-XJfbt-O27FI",
          deploymentStatus: "completed",
        },
        {
          index: 928,
          address: "EQB57VGFRog0MxQ1S2IqccqZC02xwdT--P-6WjJfdKNVm78Z",
          deploymentStatus: "completed",
        },
        {
          index: 929,
          address: "EQBNmI99Z8uYNxu3XcgPnGEM0ct_jbgNV-XvuKDFapbBrGKG",
          deploymentStatus: "pending",
        },
        {
          index: 929,
          address: "EQBNmI99Z8uYNxu3XcgPnGEM0ct_jbgNV-XvuKDFapbBrGKG",
          deploymentStatus: "completed",
        },
        {
          index: 930,
          address: "EQAOC28TQlmTf69m8Qg3H0lYFZd-EEYCML3235x1bH0TzU8_",
          deploymentStatus: "completed",
        },
        {
          index: 931,
          address: "EQAt7F08s2SApKHCVNxzhumtE-0reksIuYuZx44gLxl8xQYp",
          deploymentStatus: "completed",
        },
        {
          index: 932,
          address: "EQB2VG6OflL6BAwhEpgVmwKW9GuIaO8W8GOxI36nbB83dEk4",
          deploymentStatus: "completed",
        },
        {
          index: 933,
          address: "EQBnBTnQXtq_pYVTNnydREnAnfxZ66ap45HmNdBz5ndwytT9",
          deploymentStatus: "completed",
        },
        {
          index: 934,
          address: "EQCKgC6cDP9c_STOw7pyFDbzHT9d61k1HjdpTSXt5TNCG7qc",
          deploymentStatus: "completed",
        },
        {
          index: 935,
          address: "EQCcKNdAh7jFQmYQb92vxlievjTc07Bg_re2j91kaqFpo9IO",
          deploymentStatus: "completed",
        },
        {
          index: 936,
          address: "EQCRNhwd_F1E22tW6MJY3wSgSak1WptEc8HkvYKiIe0ylB39",
          deploymentStatus: "completed",
        },
        {
          index: 937,
          address: "EQDfsD1UUVvBR3chGblJfptMeLUlS89oMT9E81eS6hSvNFTm",
          deploymentStatus: "pending",
        },
        {
          index: 937,
          address: "EQDfsD1UUVvBR3chGblJfptMeLUlS89oMT9E81eS6hSvNFTm",
          deploymentStatus: "completed",
        },
        {
          index: 938,
          address: "EQAEwfhNl8y4d7qIHeuWTgkesPHsKxGpcBVHrR5ZDuXgLNnt",
          deploymentStatus: "completed",
        },
        {
          index: 939,
          address: "EQBHIIQ12uDTBdWHol7eXJtqbncRHsodmpK4TUOi_xq2-2kB",
          deploymentStatus: "completed",
        },
        {
          index: 940,
          address: "EQB4k7Lx6vLWY9BR9h09CEhkfEV_qaA4PRB72JELaLlyJAIe",
          deploymentStatus: "completed",
        },
        {
          index: 941,
          address: "EQB7mkChA3WgA_2Pl0Rp0XZ-uykyhgcLkrAfqQkmDnrp5ajN",
          deploymentStatus: "completed",
        },
        {
          index: 942,
          address: "EQAUmPnzhUs8VAp2UUwaluekA1h7V8Nv092rHJ74hs2GRsNX",
          deploymentStatus: "completed",
        },
        {
          index: 943,
          address: "EQCqDZFt-Tv3kkye85fL7eGMoUiYezFGSe5K-N9cNYlHscib",
          deploymentStatus: "completed",
        },
        {
          index: 944,
          address: "EQDY47joabLkv5VujaIOg_l_BSuXJhkPui78TnTUzA02Tbs8",
          deploymentStatus: "completed",
        },
        {
          index: 945,
          address: "EQAl7JqR2_hs16qwwFCr9gYaKbuOpGNv_tF30NGbQ5MJxzw_",
          deploymentStatus: "pending",
        },
        {
          index: 945,
          address: "EQAl7JqR2_hs16qwwFCr9gYaKbuOpGNv_tF30NGbQ5MJxzw_",
          deploymentStatus: "completed",
        },
        {
          index: 946,
          address: "EQB7FJ-6Uz7lonxbd3YBG5UV45mcZALq6imOz6MNM-QvcZjP",
          deploymentStatus: "pending",
        },
        {
          index: 946,
          address: "EQB7FJ-6Uz7lonxbd3YBG5UV45mcZALq6imOz6MNM-QvcZjP",
          deploymentStatus: "completed",
        },
        {
          index: 947,
          address: "EQBfVJIF6YCc-TKxV3CIpo2tFxG3VlRRUlBlsUi3UuM0lBJS",
          deploymentStatus: "completed",
        },
        {
          index: 948,
          address: "EQBMwJlo73C3WvgWpK1tOPYqMCLyPxbGz0IBLXf27_IEY2xF",
          deploymentStatus: "completed",
        },
        {
          index: 949,
          address: "EQCa8JqIQCj3LkRAI1EfiN3FfgS9QqR86T0p2uZY39B_mhrp",
          deploymentStatus: "completed",
        },
        {
          index: 950,
          address: "EQCj3CMe39JGuq5OFyWYNCfXDzqNNYXSDriLIDZAdLM3Jibf",
          deploymentStatus: "completed",
        },
        {
          index: 951,
          address: "EQBAMgKJo2gpIPoVLAogU9ewszo0pTx_nSh_ImEbyAWcL0NN",
          deploymentStatus: "completed",
        },
        {
          index: 952,
          address: "EQBGxhKDXxtaBlUU2OWizkijI9R3VvC7FxOQa0zFZRhi65ls",
          deploymentStatus: "completed",
        },
        {
          index: 953,
          address: "EQDhg7mviu8qCI9DesjZ2xTdAnVj57iWjsSuZ3Wb-nFbd_X-",
          deploymentStatus: "completed",
        },
        {
          index: 954,
          address: "EQD8mqcV_ZR_rNGHrjO9-ylV8FNtQF8yYx9NLDZEOvgOxHnV",
          deploymentStatus: "pending",
        },
        {
          index: 954,
          address: "EQD8mqcV_ZR_rNGHrjO9-ylV8FNtQF8yYx9NLDZEOvgOxHnV",
          deploymentStatus: "completed",
        },
        {
          index: 955,
          address: "EQAofSV7kG9zwAqDJCHS2wyKJmZKVlBvj1MXIQxsHsp1E-v0",
          deploymentStatus: "completed",
        },
        {
          index: 956,
          address: "EQAQ5c1vkaF9evRD_UaVK1ADwWpaE1cqcWWmfBLjs8jMWPb-",
          deploymentStatus: "completed",
        },
        {
          index: 957,
          address: "EQDuona2XxMZyAo64-eElN6Ik230cSodAElKTpOdNLKxak55",
          deploymentStatus: "completed",
        },
        {
          index: 958,
          address: "EQCEBEolT_vY9iBgCph9U2B1xMXP2Vbsvq20rEVdJFJiTI5K",
          deploymentStatus: "completed",
        },
        {
          index: 959,
          address: "EQD_mw1HtTUt-9W_MCaDvDt3UZKoUwPxQ-Q71iz6ZHPozlhN",
          deploymentStatus: "completed",
        },
        {
          index: 960,
          address: "EQAOPOooR6YzRgb6LN9hHn1UDAcoVu-_HqMxHSnzRUPz3ZwP",
          deploymentStatus: "completed",
        },
        {
          index: 961,
          address: "EQC69j7QJb0wwKZvc9LZtgUrAVNWCGEcmHzTLBsejNGuoW1w",
          deploymentStatus: "completed",
        },
        {
          index: 962,
          address: "EQBiuPqJ4WL0ETb_FVtE63Xch9GvSUt43-EmLmYn9jO7m5I9",
          deploymentStatus: "completed",
        },
        {
          index: 963,
          address: "EQBOxl4fKBddOW0Uk7oVAe0OSs34ar7dC3T-PweZsfO2sY11",
          deploymentStatus: "pending",
        },
        {
          index: 963,
          address: "EQBOxl4fKBddOW0Uk7oVAe0OSs34ar7dC3T-PweZsfO2sY11",
          deploymentStatus: "completed",
        },
        {
          index: 964,
          address: "EQCkskDHDHlsqSNzZzpjCbVu4LaB3NaPRd6MXb-wBQpI_lXS",
          deploymentStatus: "completed",
        },
        {
          index: 965,
          address: "EQA7so39F71PN0ZSBuwlNksEQ34kDd44rg7Pt9mpMv73ugrH",
          deploymentStatus: "completed",
        },
        {
          index: 966,
          address: "EQA2APN0DbMZxqSHm07izrktcHOkKBTiAv9g6zwjnWCkVFPs",
          deploymentStatus: "completed",
        },
        {
          index: 967,
          address: "EQBU1d0-A4PnKV7uVlCaD6sjUBBSz7hunspOK-KIrIT-uGPQ",
          deploymentStatus: "completed",
        },
        {
          index: 968,
          address: "EQDzAzrMBXpI6d_CuLHlZ4zOjaOVEq1PeQspL1EXzXmY4qNC",
          deploymentStatus: "completed",
        },
        {
          index: 969,
          address: "EQCIk4tEXEfseXBcdVqFvBvEqp5chvnrAXuvv3jfVbuR7bpv",
          deploymentStatus: "completed",
        },
        {
          index: 970,
          address: "EQBmWlqQC4XHVxQv7GSczCGoTEgjtaf0EaBGIgU7eppaiwgI",
          deploymentStatus: "completed",
        },
        {
          index: 971,
          address: "EQCaJpMTqDS-Vf8XyDeOQJ9V4_530qrlCA-lu43Kj30-IB_C",
          deploymentStatus: "pending",
        },
        {
          index: 971,
          address: "EQCaJpMTqDS-Vf8XyDeOQJ9V4_530qrlCA-lu43Kj30-IB_C",
          deploymentStatus: "completed",
        },
        {
          index: 972,
          address: "EQCNFtXwNs04YGkMO3c7BJkH3zlXz2TWjsSZXzexoUxsCIBH",
          deploymentStatus: "completed",
        },
        {
          index: 973,
          address: "EQDCXPWgbtdM5UBwAU3_EeLuR__G4K7qk9npjlWgFv_IhBhl",
          deploymentStatus: "completed",
        },
        {
          index: 974,
          address: "EQBuJvTRTr7xAFWq2KUG4FmQB52T4H48P9GwyVxSvWEXUTZ3",
          deploymentStatus: "completed",
        },
        {
          index: 975,
          address: "EQB6SoDGsYAuRnnNeOgK_8S9K2AvoyYK-dpb5cA6pN8ad0rm",
          deploymentStatus: "completed",
        },
        {
          index: 976,
          address: "EQCm9oR9LCZ_6MwNmzadpnCMwEuICT5Mx-8EpVNxHau5wG4u",
          deploymentStatus: "completed",
        },
        {
          index: 977,
          address: "EQBu582BhhHUAF3HTp9kxziOhPDR7en_h_3C_yAWYHXMaDwl",
          deploymentStatus: "completed",
        },
        {
          index: 978,
          address: "EQCmlWoAAx6lTdrGq7PzJslIa0pUC47f5LOng7tw9eeFR5h8",
          deploymentStatus: "completed",
        },
        {
          index: 979,
          address: "EQA8XXa_Ub9aBFnXPeLPqnn-q4nRasCzJos0KGbzUObfrt86",
          deploymentStatus: "pending",
        },
        {
          index: 979,
          address: "EQA8XXa_Ub9aBFnXPeLPqnn-q4nRasCzJos0KGbzUObfrt86",
          deploymentStatus: "completed",
        },
        {
          index: 980,
          address: "EQBzecacW14-YP0g30wv83mkligJZvgmU8aWIyAHbDFy43UG",
          deploymentStatus: "completed",
        },
        {
          index: 981,
          address: "EQACdQDG6YeDjjIBGwI4v9f7bw9tRwuOAskfeDAw6BUZe4hN",
          deploymentStatus: "completed",
        },
        {
          index: 982,
          address: "EQB2CVregE0vJUvoN_LTH3cnBB69XAxxGrdhrt8lRS4KO6sT",
          deploymentStatus: "completed",
        },
        {
          index: 983,
          address: "EQARrB-A26DMUNGFh3IS1RLzdehHJSHJr-CsyPjIzZTSm44j",
          deploymentStatus: "completed",
        },
        {
          index: 984,
          address: "EQBlKa7uvParf4SmA4eQaezOnsr7F41ZDC4HxSSpp63HFHB-",
          deploymentStatus: "completed",
        },
        {
          index: 985,
          address: "EQAcZuEBvFq6Uq2KNm1-bvSpN6JxIWBY3sHU3l1J0G4Oc2CL",
          deploymentStatus: "completed",
        },
        {
          index: 986,
          address: "EQA_Bvdun_NbtC_-KupD2yLwfiHe9E4ZKlBSziK-LClSPiKU",
          deploymentStatus: "completed",
        },
        {
          index: 987,
          address: "EQD_Wssq9_C1Sj8OKLxgU-hnwqNWs0bkKQpJOspRupqD_pU9",
          deploymentStatus: "pending",
        },
        {
          index: 987,
          address: "EQD_Wssq9_C1Sj8OKLxgU-hnwqNWs0bkKQpJOspRupqD_pU9",
          deploymentStatus: "completed",
        },
        {
          index: 988,
          address: "EQCed-w3_VjtgJMa1OYLyeUgIpra3nq57pHT9D3v_lyGnmRK",
          deploymentStatus: "pending",
        },
        {
          index: 988,
          address: "EQCed-w3_VjtgJMa1OYLyeUgIpra3nq57pHT9D3v_lyGnmRK",
          deploymentStatus: "completed",
        },
        {
          index: 989,
          address: "EQBdEo2QvW2i6P9bz3NNpjMy-9HEyYLZyo8HhQMC2CUisBot",
          deploymentStatus: "completed",
        },
        {
          index: 990,
          address: "EQBtahgbXWK85FWAIxXfSNzMORn4mYw4rhsZT49Sg-eC0Rrt",
          deploymentStatus: "completed",
        },
        {
          index: 991,
          address: "EQAdJF8EIXUZ6zs1WA7uCMTCTVnmPpMICE9dFimue3KAdS_9",
          deploymentStatus: "completed",
        },
        {
          index: 992,
          address: "EQDap32993hvhYaRBDjhEaxKuRon-DYHOonxWiPiWaht79Tp",
          deploymentStatus: "completed",
        },
        {
          index: 993,
          address: "EQAGBTS62RIC-qWpuWYPZyoRMWPW-1aicH_1MGtO5Aqlivxe",
          deploymentStatus: "completed",
        },
        {
          index: 994,
          address: "EQDyY00U6YIiDGrdQZdTYhW2ymMv1g1hiNv1YaqGYTRJwDw7",
          deploymentStatus: "completed",
        },
        {
          index: 995,
          address: "EQCST6aGxoDPbseULcCjI6FYG3O2A6Kp7NCzjQY-XDDZ2C0J",
          deploymentStatus: "completed",
        },
        {
          index: 996,
          address: "EQBRHeIyMJ7N3FqNPEGJPTm807Fqeh3O-4oKMohZmYfGTARO",
          deploymentStatus: "pending",
        },
        {
          index: 996,
          address: "EQBRHeIyMJ7N3FqNPEGJPTm807Fqeh3O-4oKMohZmYfGTARO",
          deploymentStatus: "completed",
        },
        {
          index: 997,
          address: "EQAnF6WVC0x4RFhivCnkbH8GNA76wo1y018lLW7QrPyXinU7",
          deploymentStatus: "completed",
        },
        {
          index: 998,
          address: "EQCi1mbV0OyYusTyfnvyW7Ok_6-RnHdewVU3DFh8Jf-NTIPA",
          deploymentStatus: "completed",
        },
        {
          index: 999,
          address: "EQCJVdlHmLpNsUMwalfedC6pfe6ugPC-wWDEhCwuiquBbkQR",
          deploymentStatus: "completed",
        },
        {
          index: 1000,
          address: "EQDh3gs0Ws39ljEo6yAw9NTgLeQmBl1pxzFBWtP9Jj7ffk2A",
          deploymentStatus: "completed",
        },
        {
          index: 1001,
          address: "EQBl7ymAMAg1OaCpXqA6z7y3wF9nHS5FY_AS2BeLkNcjKMIw",
          deploymentStatus: "completed",
        },
        {
          index: 1002,
          address: "EQCbONMFCrFtWaEwQdyRlim-h03lpUU9LDzz_uAwIJKLD4m1",
          deploymentStatus: "completed",
        },
        {
          index: 1003,
          address: "EQA6Ss0jtxCPRdItK4vR71YpkHetctJi6d9PfEGMJjFNqf5a",
          deploymentStatus: "completed",
        },
        {
          index: 1004,
          address: "EQCcVgyk56TG9gMB_mPuiIfB_F76jVta8DIESbDBmVKclh5F",
          deploymentStatus: "pending",
        },
        {
          index: 1004,
          address: "EQCcVgyk56TG9gMB_mPuiIfB_F76jVta8DIESbDBmVKclh5F",
          deploymentStatus: "completed",
        },
        {
          index: 1005,
          address: "EQDNq_xIq58qxM_98X0I58KnoS4afZW4OHnCiqZSbW79RfLF",
          deploymentStatus: "completed",
        },
        {
          index: 1006,
          address: "EQCPon3xmZpjzUhBoa6Jmjd2JmJlsAVwanQr0N3kqHBQh9yX",
          deploymentStatus: "completed",
        },
        {
          index: 1007,
          address: "EQBgd1auOP94A28pkzJKFLyls02lBcFbq91YUGPAdjY3uWDD",
          deploymentStatus: "completed",
        },
        {
          index: 1008,
          address: "EQDHbAoVo66b9inTvL2MtpEqRl_ZMSc_clDx3PlZcQih8i6S",
          deploymentStatus: "completed",
        },
        {
          index: 1009,
          address: "EQCapYOIqJFwuPAmty6A8kwwz8Q1g_ti0GwrnddJ_nB0-o5k",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "14.json",
      supply: 50,
      currentSupplyIndex: 50,
      copies: [
        {
          index: 1010,
          address: "EQBmXvW3mIJeZh3NabywlQ3aF5wf6aUvm0dyuCz9znZZOVRh",
          deploymentStatus: "completed",
        },
        {
          index: 1011,
          address: "EQDC8Rt7BROSTudZU10s_LULaMvut-oqditRyti4jUK8b4nh",
          deploymentStatus: "completed",
        },
        {
          index: 1012,
          address: "EQByBkD_njwBSGz93jMWzkd77OATtWwV-LQAtNKQN8EhSWZ2",
          deploymentStatus: "completed",
        },
        {
          index: 1013,
          address: "EQB5Sns7BXfJ-XQ4yQUFlKZ7x7MY-Z3JY6c9JU6Incyh6D_y",
          deploymentStatus: "pending",
        },
        {
          index: 1013,
          address: "EQB5Sns7BXfJ-XQ4yQUFlKZ7x7MY-Z3JY6c9JU6Incyh6D_y",
          deploymentStatus: "completed",
        },
        {
          index: 1014,
          address: "EQCj9RIRI5-R353UA_MwjWbFXb4j8SrNCmnNe3tAU0vdwcj0",
          deploymentStatus: "completed",
        },
        {
          index: 1015,
          address: "EQAlNAwnR0F_HOemDb8zmWqBH6XeTvbbFHKZAe_0yNjMdmEg",
          deploymentStatus: "completed",
        },
        {
          index: 1016,
          address: "EQAUWXh5QW2SV6Klc-iiG9SmpOCA4LEh24e_-ADUMcfI53nL",
          deploymentStatus: "completed",
        },
        {
          index: 1017,
          address: "EQAZvpWkg9Xas82djRp2AlV8s-ISqntXZERenaSZePNTy6Aa",
          deploymentStatus: "completed",
        },
        {
          index: 1018,
          address: "EQApLGuKIWva4z1zwI3PZDIHG4XrCJ-CwPUfVViDC7KZgptG",
          deploymentStatus: "completed",
        },
        {
          index: 1019,
          address: "EQDG5hYiC_V1bTBsPrU4Ainlavo1_ofQXycQJ3iB9Bgl586_",
          deploymentStatus: "completed",
        },
        {
          index: 1020,
          address: "EQBuLthPVytJ7biDDqD2QB0MmHk8LPs9xAjMK3rQP-QtKja6",
          deploymentStatus: "completed",
        },
        {
          index: 1021,
          address: "EQDsuPW88nt6vtEdj9TU0wwnFCpeLpFWi6nAtWj3lKlqp6kz",
          deploymentStatus: "pending",
        },
        {
          index: 1021,
          address: "EQDsuPW88nt6vtEdj9TU0wwnFCpeLpFWi6nAtWj3lKlqp6kz",
          deploymentStatus: "completed",
        },
        {
          index: 1022,
          address: "EQCk17i1S46wJEbUuValo_r_wNm2mKhjFqIsyDekQhcczNcF",
          deploymentStatus: "completed",
        },
        {
          index: 1023,
          address: "EQAEArKwweBSr5ix8oWjge23DnugwdsJBw6Z-Z5-WqcLr0Lb",
          deploymentStatus: "completed",
        },
        {
          index: 1024,
          address: "EQDccBBQlliZ8S_dLfjLxcb6VD_xl1KbaVQORJ7RBluagQsD",
          deploymentStatus: "completed",
        },
        {
          index: 1025,
          address: "EQDH8IFwbtW5ho7yfGmO9gHSOLWCA59KL5XDpV2fFg3WffSm",
          deploymentStatus: "completed",
        },
        {
          index: 1026,
          address: "EQAGuv-kKsUiGQuso_mUYQLFDuvg3tWJ-8-L1_gKjv-TNeP0",
          deploymentStatus: "completed",
        },
        {
          index: 1027,
          address: "EQABI1a8KLbncHa3nO4d3qNm9YTOCSQIA1Cd8OCXfoJ6wLX0",
          deploymentStatus: "completed",
        },
        {
          index: 1028,
          address: "EQDs4pI13sSd3Pg8KWJUTtUyx4bqksT4qTRMQd6PXCFc3r3_",
          deploymentStatus: "completed",
        },
        {
          index: 1029,
          address: "EQDNxzHCFWYhswf7Kh-0xcZEcrpXdlXjoYOCWbhTAmagPg-7",
          deploymentStatus: "pending",
        },
        {
          index: 1029,
          address: "EQDNxzHCFWYhswf7Kh-0xcZEcrpXdlXjoYOCWbhTAmagPg-7",
          deploymentStatus: "completed",
        },
        {
          index: 1030,
          address: "EQAmb1dgHqhLUnkBH6Z0FXl8jMK3bPRNffwjhObh_8JzRL2G",
          deploymentStatus: "completed",
        },
        {
          index: 1031,
          address: "EQDklIW4ea07aEznJvy6Mosu-wmspIo6WkI58Rp9vLrpLQZf",
          deploymentStatus: "completed",
        },
        {
          index: 1032,
          address: "EQC6hIZnPPfr2qGRMO2PD1RINDp66qZQxpTNeWELccIHLYF8",
          deploymentStatus: "completed",
        },
        {
          index: 1033,
          address: "EQDR_DesOy9b2j2UnfnXXrfy1IlFLq6A7gTGziv1HDCqiyq-",
          deploymentStatus: "completed",
        },
        {
          index: 1034,
          address: "EQDIGINPM_wBsr1rFg-CjSFbQj_jTrWoY-dvAEWNuLwyl0J3",
          deploymentStatus: "completed",
        },
        {
          index: 1035,
          address: "EQDj4ldGk-gRREUUbX3JkF33N1gThOBSRAIkuHnEn659czk7",
          deploymentStatus: "completed",
        },
        {
          index: 1036,
          address: "EQAyKwJPW-FLOC6cd96VxFlxQ2HpcBiIkBTRrLbZIxgHbOWh",
          deploymentStatus: "completed",
        },
        {
          index: 1037,
          address: "EQAJVqnWUztPjOTaMnZoEabqIq5CqAU80R0kAV_PKCHkMByn",
          deploymentStatus: "completed",
        },
        {
          index: 1038,
          address: "EQDnk3b1KjczaR0_seAU8W8qIrvoJLzlw0ymsgavcWdF5pcm",
          deploymentStatus: "pending",
        },
        {
          index: 1038,
          address: "EQDnk3b1KjczaR0_seAU8W8qIrvoJLzlw0ymsgavcWdF5pcm",
          deploymentStatus: "completed",
        },
        {
          index: 1039,
          address: "EQCeNCGRixCnvGwlVB5mm1th4OlFGQqonjl6TDL9wjQ_z5Yc",
          deploymentStatus: "completed",
        },
        {
          index: 1040,
          address: "EQCFSEuIcJUaelFDqlwj-j052hmdD708LiHKtj3FYRjn7lH7",
          deploymentStatus: "completed",
        },
        {
          index: 1041,
          address: "EQD8e_N4Tcx6ws4UIXjfi2AMSWYUWu_EkjUbXJpxT9ntt9SH",
          deploymentStatus: "completed",
        },
        {
          index: 1042,
          address: "EQDXjUz7P_Gi7afEwtpsOV-dLb97RFL5zHymZ6YrDSNn1GTv",
          deploymentStatus: "completed",
        },
        {
          index: 1043,
          address: "EQBZmCzXPL6qTCOW2b5MZvhZACHgnDEGv3pgTDBHjnpQbcNH",
          deploymentStatus: "completed",
        },
        {
          index: 1044,
          address: "EQBs0QDA-k_jEvSu83JOnyN1dzkPSNVb6priL4o4hWGy_JYb",
          deploymentStatus: "completed",
        },
        {
          index: 1045,
          address: "EQCWQ8ecpqfHvzY6Q8HuPImBTJCej-Vhx5pHQ0uF_54JiGYI",
          deploymentStatus: "completed",
        },
        {
          index: 1046,
          address: "EQAM5EoRvXp047vTRJ3JtCiMOXP-f5Rdt25-sBOvATlb8P86",
          deploymentStatus: "completed",
        },
        {
          index: 1047,
          address: "EQB7y4DkPzj1AZJWgZW2eo32lSGImiOFF4EyVB2Ljp8s3jOx",
          deploymentStatus: "pending",
        },
        {
          index: 1047,
          address: "EQB7y4DkPzj1AZJWgZW2eo32lSGImiOFF4EyVB2Ljp8s3jOx",
          deploymentStatus: "completed",
        },
        {
          index: 1048,
          address: "EQBtJQPowlFNXCj1610zu7ubVbkGF26njT4iP1kgt0QNYpTb",
          deploymentStatus: "completed",
        },
        {
          index: 1049,
          address: "EQBMdZizr1gQgqufCr6GZr008oNFrvzNJ-AWBTiBT6szp_bP",
          deploymentStatus: "completed",
        },
        {
          index: 1050,
          address: "EQAC99qeplaGlWjXeEKVYfX-CvtrYFzuca-II9N1UoLPXHNM",
          deploymentStatus: "completed",
        },
        {
          index: 1051,
          address: "EQC2cQkSH6WqD3A6HcA3QHJni15OYK5RB7jUbZPCcTOWVvvH",
          deploymentStatus: "completed",
        },
        {
          index: 1052,
          address: "EQAZo1hlOYAnRITfYbJbf9zZ0XGpDVrPhVdh2J232y-zVEpN",
          deploymentStatus: "completed",
        },
        {
          index: 1053,
          address: "EQB-3A4S5QMKY2ZTSw8zWtY18nQHnPjzq1to9hJljVE8x8TI",
          deploymentStatus: "completed",
        },
        {
          index: 1054,
          address: "EQBaMtvH0blGkpMajPtzZIKxO9KSJrOFSxCiiQV7MKWd4cJs",
          deploymentStatus: "completed",
        },
        {
          index: 1055,
          address: "EQDuNX1R6WMYDWzJ_QRzf1OieH80fjwX4fFiwUigsSzrXUA_",
          deploymentStatus: "pending",
        },
        {
          index: 1055,
          address: "EQDuNX1R6WMYDWzJ_QRzf1OieH80fjwX4fFiwUigsSzrXUA_",
          deploymentStatus: "completed",
        },
        {
          index: 1056,
          address: "EQC0hzSw-ys37zp630CKLw6bjZd0hCZXco-k5Rpzfm5jiRRs",
          deploymentStatus: "completed",
        },
        {
          index: 1057,
          address: "EQAx91FpEUWm7EfC8wkR0WxtLki1TZzEFB08Bvb-Ob4ADo1e",
          deploymentStatus: "completed",
        },
        {
          index: 1058,
          address: "EQCoM-DdSLTwEVsrRzmK5gqRqn4IX-LvJBg5wIK82fPeDCSB",
          deploymentStatus: "completed",
        },
        {
          index: 1059,
          address: "EQDefLj3RnSbrLn1-fTQxwhUVff5oTna3cJA9GPsrgsML_d5",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "15.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 1060,
          address: "EQDqz19AZKj-CEUDJh58xVIc8VdEIoKPfvWihj4Ac_3v4mBC",
          deploymentStatus: "completed",
        },
        {
          index: 1061,
          address: "EQBLjTHMe2GW4_WqfS4GmWfUX9ZTmax3ZQm4qbxACLRK2knq",
          deploymentStatus: "completed",
        },
        {
          index: 1062,
          address: "EQCdhx2ywrv-QK5e2gBnV7LtIJiuNGegxoeTaDXBVbA0OF54",
          deploymentStatus: "completed",
        },
        {
          index: 1063,
          address: "EQDYeZK-c_uhrLq8GA9aUG2a1N8ur3J1DgQSgddiXdLS8KPF",
          deploymentStatus: "pending",
        },
        {
          index: 1063,
          address: "EQDYeZK-c_uhrLq8GA9aUG2a1N8ur3J1DgQSgddiXdLS8KPF",
          deploymentStatus: "completed",
        },
        {
          index: 1064,
          address: "EQClhfD7nkIrblUiygdsoBILAu-UXZW1Lrxv582zpf0eYnqw",
          deploymentStatus: "completed",
        },
        {
          index: 1065,
          address: "EQAW3fGRRopIRz7CyURjtTe8x40H4VgYxIimONDEI0VPjz4u",
          deploymentStatus: "completed",
        },
        {
          index: 1066,
          address: "EQBUcxMa7JfFMstetnu1wrvQDVbVAMcjD9M8-nHBLCSC-81L",
          deploymentStatus: "completed",
        },
        {
          index: 1067,
          address: "EQCnvn8TQm2CChRnAMej7PDbuMrtPpW4c4D9H2G0KHuutK2D",
          deploymentStatus: "completed",
        },
        {
          index: 1068,
          address: "EQBLPzD0Vov7ZBXnVSZfnTadzU4_nuvQqMfEdopAmxKny96G",
          deploymentStatus: "completed",
        },
        {
          index: 1069,
          address: "EQDExuCtLpqrlHAfwZkbFVFOKjpbfeOwNsfd2JqA6-suvu5B",
          deploymentStatus: "completed",
        },
        {
          index: 1070,
          address: "EQDIxvBDcd-OIjrTWKLW1a4NDv3RBUqMlFfPjEiOM2uFSjMo",
          deploymentStatus: "completed",
        },
        {
          index: 1071,
          address: "EQCccOqrT9AhGWmTBnGAf5XvQ-DF35AgVw0qrxr883u0vnoM",
          deploymentStatus: "completed",
        },
        {
          index: 1072,
          address: "EQCzVKaJ2eH9PhSpnrRziZNmeXj_E3xu7qGwkZJa0TnD3rCy",
          deploymentStatus: "pending",
        },
        {
          index: 1072,
          address: "EQCzVKaJ2eH9PhSpnrRziZNmeXj_E3xu7qGwkZJa0TnD3rCy",
          deploymentStatus: "completed",
        },
        {
          index: 1073,
          address: "EQBkLOnrU0EDvFFQ_wXl5NwjI_JrXlqc9lGWajP_NhplSU_e",
          deploymentStatus: "completed",
        },
        {
          index: 1074,
          address: "EQDLWe7V9iPu6F6miILqyb6uA8qlya1bm3wuy-FyPfoj5fYA",
          deploymentStatus: "completed",
        },
        {
          index: 1075,
          address: "EQB6is3m5PVaIH3mo2O508jQevuGvK7rHejycqbxZjJNE6HP",
          deploymentStatus: "completed",
        },
        {
          index: 1076,
          address: "EQA0CdmEgVCiHDjn3V488E4HeySSMD0aDKjta1DMNK-Hj8jx",
          deploymentStatus: "completed",
        },
        {
          index: 1077,
          address: "EQCGTL_ewoDKD-qj5I7-cGYhlZtBXrWWNbu_O02eARQ-hXR2",
          deploymentStatus: "completed",
        },
        {
          index: 1078,
          address: "EQDUrWiBIgpYgJpudtzMRR0Tmy8I8Y7LRqWeWJTXKl2qg80o",
          deploymentStatus: "completed",
        },
        {
          index: 1079,
          address: "EQC_8b3z2s9qvFyQpgEiML5uVILaW79d1_WdD-qLcssGqIRR",
          deploymentStatus: "completed",
        },
        {
          index: 1080,
          address: "EQBEBckk3NY8Qu2bcmp_ghb4zatWe-r6BTzJbL4n3WAM94zE",
          deploymentStatus: "pending",
        },
        {
          index: 1080,
          address: "EQBEBckk3NY8Qu2bcmp_ghb4zatWe-r6BTzJbL4n3WAM94zE",
          deploymentStatus: "completed",
        },
        {
          index: 1081,
          address: "EQC5jvj3JKoxYoRtQCjjV4c78r1xcOi8bIy0y-6z04xcbiXA",
          deploymentStatus: "completed",
        },
        {
          index: 1082,
          address: "EQAr_ur3tRMyVBuiLYZ3t1hmCWQe1G9nC7fZMNJ2C0IvT4p2",
          deploymentStatus: "completed",
        },
        {
          index: 1083,
          address: "EQBoq9YX_aSwqHmItqd8x15p4KiZ7me-OORxkuxSx-SUc2Sl",
          deploymentStatus: "completed",
        },
        {
          index: 1084,
          address: "EQAiYDwi1DIPg-2H_P10Vl6WZa2liTJr3MGbmVjpHpLoSSpf",
          deploymentStatus: "completed",
        },
        {
          index: 1085,
          address: "EQB-RNr1Q8SE3dg413UFOmICIQ4G_Z-JBwQ9xQPN6DsHE9Do",
          deploymentStatus: "completed",
        },
        {
          index: 1086,
          address: "EQBsJ7ZedS7Y_QPjwbqHt2Uc2XqIAdd89Fo_lPwAFFJsHCX7",
          deploymentStatus: "completed",
        },
        {
          index: 1087,
          address: "EQCd4juLu_trWSqS-O__9PV1WARILE_mH6aPjnDur8jaG90k",
          deploymentStatus: "completed",
        },
        {
          index: 1088,
          address: "EQCftbY_bAzCV9mNx4BcSj2pZESW58bzAcrTRyuEe95KshgE",
          deploymentStatus: "pending",
        },
        {
          index: 1088,
          address: "EQCftbY_bAzCV9mNx4BcSj2pZESW58bzAcrTRyuEe95KshgE",
          deploymentStatus: "completed",
        },
        {
          index: 1089,
          address: "EQCwMpK3c8OWqxnr1UdUcjREIc7Qtp_kmrBpNRivXZU4Zhko",
          deploymentStatus: "completed",
        },
        {
          index: 1090,
          address: "EQBgV5xVLffBwP_whw9LH-glTuEixJCF4ttnAphdQpVtwdLO",
          deploymentStatus: "completed",
        },
        {
          index: 1091,
          address: "EQDVYF7CxM16NWb-CZf6oW-P8NBpZtJwI7NfpmzwRHCW5KP3",
          deploymentStatus: "completed",
        },
        {
          index: 1092,
          address: "EQBvVU5E3kd8Oua1OIKhCgJcHIE4dwQRcxlpO8U4dO8YAQzv",
          deploymentStatus: "completed",
        },
        {
          index: 1093,
          address: "EQBd1wbKfLceeQUf8fECpgo_Dt7uOFTBWZRazt9cSlUxxwrL",
          deploymentStatus: "completed",
        },
        {
          index: 1094,
          address: "EQDfzkJ1cxERKkd5kmQmm-J-p0PioeYrl5SpLetDIRvE1TI8",
          deploymentStatus: "completed",
        },
        {
          index: 1095,
          address: "EQAc7ehk7W3V5O7xSye-Qg0fwLDnE9uk3T0UgvoUo_Sg4wU-",
          deploymentStatus: "completed",
        },
        {
          index: 1096,
          address: "EQBFlFFZLnN7FhSJyGVgaOw0UHgVgNp3klonrBqbr0ENLDIs",
          deploymentStatus: "completed",
        },
        {
          index: 1097,
          address: "EQASZkPi-zlRQTmtTVfNEHwsW4AWAQljgg6DmPllUGrucCap",
          deploymentStatus: "pending",
        },
        {
          index: 1097,
          address: "EQASZkPi-zlRQTmtTVfNEHwsW4AWAQljgg6DmPllUGrucCap",
          deploymentStatus: "pending",
        },
        {
          index: 1097,
          address: "EQASZkPi-zlRQTmtTVfNEHwsW4AWAQljgg6DmPllUGrucCap",
          deploymentStatus: "completed",
        },
        {
          index: 1098,
          address: "EQCRusiqlgAxjRr2ER-FYptddHfYCwsxEo2QAGoiB8FdbvQt",
          deploymentStatus: "completed",
        },
        {
          index: 1099,
          address: "EQDE_30yBeKgGNkTR2sSb_dHwNyyqTlIQjODJ9X2-ENZM12a",
          deploymentStatus: "completed",
        },
        {
          index: 1100,
          address: "EQBzZwdA-TOlWdYB_jm7Z0jdXfskc8ZG1wNG0Djedj81h84a",
          deploymentStatus: "completed",
        },
        {
          index: 1101,
          address: "EQBrOGn6imR5JXoPHOsfAFcnd4utsEwFcPWVm39Sprhtpfhw",
          deploymentStatus: "completed",
        },
        {
          index: 1102,
          address: "EQAQ7sRHjnooeqbZP1fJSVziVymPsHp0BNBgmE7MbX9kfZBm",
          deploymentStatus: "completed",
        },
        {
          index: 1103,
          address: "EQDpokqKrnk3EbS0DBR1Kc4tlAF-JCBSXWttC2SNHGbUA2X2",
          deploymentStatus: "completed",
        },
        {
          index: 1104,
          address: "EQDdbh_YXMp1Fk2i6ugRDtFlU3cjifOWj-AbFUvJWKwsyFso",
          deploymentStatus: "completed",
        },
        {
          index: 1105,
          address: "EQB2Fr7ROdghq3D_dnWl17MA2psAPub5IVkOLdry6SvW28pC",
          deploymentStatus: "pending",
        },
        {
          index: 1105,
          address: "EQB2Fr7ROdghq3D_dnWl17MA2psAPub5IVkOLdry6SvW28pC",
          deploymentStatus: "completed",
        },
        {
          index: 1106,
          address: "EQDyWx0I1BDR6vKechEU_Lhqa3RV7zEEXCzgrxX10VNzKSBJ",
          deploymentStatus: "completed",
        },
        {
          index: 1107,
          address: "EQAvvtQt2Ee208Fsuag87NzGsAR0RfQvOeGb6dX6yjqoAW-v",
          deploymentStatus: "completed",
        },
        {
          index: 1108,
          address: "EQDXYjsF6BlZd1TvbU1zCCKVu7qLPJZx-g3eOb1KTynCZHMG",
          deploymentStatus: "completed",
        },
        {
          index: 1109,
          address: "EQDWrJgz2OBDyzNYlFc5KhItIbt7nt71FtclIz8SBXJyQx_T",
          deploymentStatus: "completed",
        },
        {
          index: 1110,
          address: "EQBpPbus-FsDZ0zxxk1yEJBtTOvUp13YEp7X7Qg6vhoUr_6b",
          deploymentStatus: "completed",
        },
        {
          index: 1111,
          address: "EQBJscNHku4kmWtvlRbE-KHPbet6M_hT0KKD9YthY9biLtOO",
          deploymentStatus: "completed",
        },
        {
          index: 1112,
          address: "EQAl86VhxHU0WJKc8nmtvbBe3zHeizADnM0VaqtWBXMW8cFG",
          deploymentStatus: "completed",
        },
        {
          index: 1113,
          address: "EQBtEmVsSZtrD7Up20Nbq-jk6CXnk8FAc-cx-1bJrt3dBVXG",
          deploymentStatus: "pending",
        },
        {
          index: 1113,
          address: "EQBtEmVsSZtrD7Up20Nbq-jk6CXnk8FAc-cx-1bJrt3dBVXG",
          deploymentStatus: "completed",
        },
        {
          index: 1114,
          address: "EQDN2Dn7uJnFgQ-tqfV3JcLiU7o9YFzOV2pkw5uVItav_EZu",
          deploymentStatus: "completed",
        },
        {
          index: 1115,
          address: "EQCvCFgAchAN7KYj3pj0_H2MPWi0bklSrFuhbKCfmaFmI26r",
          deploymentStatus: "completed",
        },
        {
          index: 1116,
          address: "EQAr6TdbXC5OuOq6g08rI5QPRqnV2vk_QYJQUoP_JesrLHVF",
          deploymentStatus: "completed",
        },
        {
          index: 1117,
          address: "EQCSDDgNgcsltAuClRVhB_izx4Nj-6CnUYi-74qrH3gsBQcS",
          deploymentStatus: "completed",
        },
        {
          index: 1118,
          address: "EQBVIrFUz7cEsidMITYKYyQ3PYn1pavnXgeSMzcQSWfAcbA0",
          deploymentStatus: "completed",
        },
        {
          index: 1119,
          address: "EQAgXAcsIkKjDhO76qJJDlJslWDlz31ZH2PoXLNjTgBaujTT",
          deploymentStatus: "completed",
        },
        {
          index: 1120,
          address: "EQB3kgeKbCrv20OV2CsE4Dy-ZMHZbO19pREWKHpXEwrWQh-d",
          deploymentStatus: "completed",
        },
        {
          index: 1121,
          address: "EQAUn9197i8cPfHixE-wjku2cYc5B5RUbvndGmv45ZDwo57E",
          deploymentStatus: "completed",
        },
        {
          index: 1122,
          address: "EQC869kYFa6sOK2IdeM5Jpo4K4QKhiyMTVpuUPLGrTNYWqGW",
          deploymentStatus: "pending",
        },
        {
          index: 1122,
          address: "EQC869kYFa6sOK2IdeM5Jpo4K4QKhiyMTVpuUPLGrTNYWqGW",
          deploymentStatus: "completed",
        },
        {
          index: 1123,
          address: "EQDNixipnExw5ZHZiwXXJebwd4ZnpoFchzJvQ2kU4u1hdvEW",
          deploymentStatus: "completed",
        },
        {
          index: 1124,
          address: "EQCYKuxPoAO_Pzxua8QSAl8G2xjzHMgXVIJp30m07Kx0Hmn9",
          deploymentStatus: "completed",
        },
        {
          index: 1125,
          address: "EQDk-XC7KySaSYXybFs4GUBEaUov_Ip3rTLGY5yZ3cZmdWIv",
          deploymentStatus: "completed",
        },
        {
          index: 1126,
          address: "EQA63k9eU6_-nQyVTY_bfj03kp7kidd8wkjrxzyx0yxvKr-z",
          deploymentStatus: "completed",
        },
        {
          index: 1127,
          address: "EQADWGuRU3Hl2bFaiE5x5wkPfIo8H2yBhwk_TYEEpsQVEhVO",
          deploymentStatus: "completed",
        },
        {
          index: 1128,
          address: "EQCrWq5XnkWsbaF-FdXoSAMkRdS3KebfDlxZNrZKA1j-uFG6",
          deploymentStatus: "completed",
        },
        {
          index: 1129,
          address: "EQAxmsCzkdQbhbzj3pty6A6OVkbwxasdsvb3-lxVuK--382R",
          deploymentStatus: "completed",
        },
        {
          index: 1130,
          address: "EQCwiI7CzXOXClmlakU1L5sCNRPd7GRCKYKZiov8qbaTQR8e",
          deploymentStatus: "pending",
        },
        {
          index: 1130,
          address: "EQCwiI7CzXOXClmlakU1L5sCNRPd7GRCKYKZiov8qbaTQR8e",
          deploymentStatus: "completed",
        },
        {
          index: 1131,
          address: "EQCeb5p833ps03SC01qFkwwkNbanz__hCePU2_GyW38K7JeU",
          deploymentStatus: "completed",
        },
        {
          index: 1132,
          address: "EQCKeTJMhMbaVJkVQLV5GiBNzBr3eKCCsxfehe00KgvLCV_Y",
          deploymentStatus: "completed",
        },
        {
          index: 1133,
          address: "EQAp7BlZQ08RphnTOzEG22wRLfDYDbShI2eTdY_8YBH0cldz",
          deploymentStatus: "completed",
        },
        {
          index: 1134,
          address: "EQC3sRXz1vd9tlCumACcR2MZLLmiJ4olSVY7A721tO8mIvAZ",
          deploymentStatus: "completed",
        },
        {
          index: 1135,
          address: "EQDLgOoZuSL2OtnKQpAsnbI6jYvmFuRmgP5OnA8qD7iabk9w",
          deploymentStatus: "completed",
        },
        {
          index: 1136,
          address: "EQBVKkQVbbQcdraPQJA_uwFnzRD3x1MAwDDMWk0kRnbhRWLS",
          deploymentStatus: "completed",
        },
        {
          index: 1137,
          address: "EQArJarysMV7pTMjkf0A90iEDTgOoRrqG0CTbL_c62W0d38p",
          deploymentStatus: "completed",
        },
        {
          index: 1138,
          address: "EQALEKNPSgy9HxikXKeqS_k830EEu4ozGnF5G9EiCZHh_2ge",
          deploymentStatus: "completed",
        },
        {
          index: 1139,
          address: "EQDoQK-7GFJDXAcb56Td1cWkmnMNLikdkXQ5y61DQ2GpiF7j",
          deploymentStatus: "pending",
        },
        {
          index: 1139,
          address: "EQDoQK-7GFJDXAcb56Td1cWkmnMNLikdkXQ5y61DQ2GpiF7j",
          deploymentStatus: "completed",
        },
        {
          index: 1140,
          address: "EQCPEIEYdqWquO0w5_8xjdCNBZkwbORsrqt4GG2r6maGNoeU",
          deploymentStatus: "completed",
        },
        {
          index: 1141,
          address: "EQCOGL56Y7e8ThBJ1_X-tDaAJrsFtptuv3UFw8P4UQHfIn-1",
          deploymentStatus: "completed",
        },
        {
          index: 1142,
          address: "EQB825b_PfHa3zXNl9qxUg3c_veb9fNN82CqLjkZC50b0Tft",
          deploymentStatus: "completed",
        },
        {
          index: 1143,
          address: "EQDCKM4F13JQ1gxbSCMD0dHQuDdPWsq6KlHeysfqtHsOLenO",
          deploymentStatus: "completed",
        },
        {
          index: 1144,
          address: "EQCbENzW7lvQG_WTfxP-VJHO9ojwOmhRT_PCQmMWKndiQdAw",
          deploymentStatus: "completed",
        },
        {
          index: 1145,
          address: "EQAE_zMfKaN2ZKjbS1XeFCSUVBH06xO2wWR6fw5dtJrceoY_",
          deploymentStatus: "completed",
        },
        {
          index: 1146,
          address: "EQBxZ-5VBGI1fzBgw8xrpoIwxxOKRTlnLI1bJW4IiptH2-nS",
          deploymentStatus: "completed",
        },
        {
          index: 1147,
          address: "EQBtxrns325dJ_3ysh8xzfk_AKYlCNa2cB9VKBNgN_JQQ8Al",
          deploymentStatus: "pending",
        },
        {
          index: 1147,
          address: "EQBtxrns325dJ_3ysh8xzfk_AKYlCNa2cB9VKBNgN_JQQ8Al",
          deploymentStatus: "completed",
        },
        {
          index: 1148,
          address: "EQAQ3t-Jt079S7gQi91L8iS3w8MdjlLenJq9c9Tkow2QbzpR",
          deploymentStatus: "completed",
        },
        {
          index: 1149,
          address: "EQCOh5i7THk8BuMOxrSMkX118cno2-e5iR_V5ClL5v1c0Lg3",
          deploymentStatus: "completed",
        },
        {
          index: 1150,
          address: "EQCZaOoxOvxDS-5WYW8SsidoVm2CwBBsqdXE9WRoMVD0Oukj",
          deploymentStatus: "completed",
        },
        {
          index: 1151,
          address: "EQD5-TZnGH6W2ZbjXSPxdCWnDmVLixP_8fP3dH5OjIgOO1DH",
          deploymentStatus: "completed",
        },
        {
          index: 1152,
          address: "EQC-LG06G9gksAjcWtcc4phrY6IHPDYyOfqbPiy20LuRt6T8",
          deploymentStatus: "completed",
        },
        {
          index: 1153,
          address: "EQBlFWLi0brGGj4fv-KMW3EMd8w2hSfWBKfaQvTSJx8hxKHe",
          deploymentStatus: "completed",
        },
        {
          index: 1154,
          address: "EQA4DcyJefnMgu_TOoxcKyKm0qDUciZ1FQJUO0yqhXnA4umR",
          deploymentStatus: "completed",
        },
        {
          index: 1155,
          address: "EQCvRsVRy57yutAsk0kHTL_vgPqRax8CMitypr3SQnXqn8Ew",
          deploymentStatus: "completed",
        },
        {
          index: 1156,
          address: "EQCqzhtb0vOILt6_3kUdFXJF0OoJ100DKQW1UhYR9hO1uFHg",
          deploymentStatus: "pending",
        },
        {
          index: 1156,
          address: "EQCqzhtb0vOILt6_3kUdFXJF0OoJ100DKQW1UhYR9hO1uFHg",
          deploymentStatus: "completed",
        },
        {
          index: 1157,
          address: "EQD-yaTPHd5rRFCurj5fIfqdkvD5u0UX7mK1GFngbYUc0Glx",
          deploymentStatus: "completed",
        },
        {
          index: 1158,
          address: "EQCfxjd6IcnmLJwOHdzl-cV9bLhVFPaVYuXgYC_TZSXrplfe",
          deploymentStatus: "completed",
        },
        {
          index: 1159,
          address: "EQDbpNlXKvCUKCWoKhwB_j4lXnad6yRzpqpmK_xLIOGCK1jO",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "16.json",
      supply: 10,
      currentSupplyIndex: 10,
      copies: [
        {
          index: 1160,
          address: "EQC5MEOlqEPkp2KWAvOujEZ96ZtvD2J6ZMFagJl9ePvEYZUR",
          deploymentStatus: "completed",
        },
        {
          index: 1161,
          address: "EQCM70F2oVKjfKqCnwqQ6jSayxirOk48Ct6xktQsaTCTutsc",
          deploymentStatus: "completed",
        },
        {
          index: 1162,
          address: "EQDB-t0oEhGfMnYC7S_k804haQq2ePg6qy1By51ZWTb4E4u9",
          deploymentStatus: "completed",
        },
        {
          index: 1163,
          address: "EQAAi4iHCtJ_xG0efoDZAXibBXltB70A30bZntF4jhdzh68H",
          deploymentStatus: "completed",
        },
        {
          index: 1164,
          address: "EQBPs2v1eNAO3YxjW7Xsgl5Tj1RSV2HfNRhKDZqAK8CKtcYj",
          deploymentStatus: "pending",
        },
        {
          index: 1164,
          address: "EQBPs2v1eNAO3YxjW7Xsgl5Tj1RSV2HfNRhKDZqAK8CKtcYj",
          deploymentStatus: "completed",
        },
        {
          index: 1165,
          address: "EQBdaP3R99g89WN86oqTRC-aUI4IMVKIYSfWtg6NmDoFi_Cy",
          deploymentStatus: "completed",
        },
        {
          index: 1166,
          address: "EQDPG7Oa62FITH4uRh0r4ZpxYVNtoI4EhV6yeFGrOzWbtNpI",
          deploymentStatus: "completed",
        },
        {
          index: 1167,
          address: "EQBfM6ULua6fNvkdXlBbppkcVjHMMP7miqLRUNfyD4z1O-Hk",
          deploymentStatus: "completed",
        },
        {
          index: 1168,
          address: "EQBgX2wC0H-W5S6s8_dFTkos52tbxEbpHedVokk-u-VHonKg",
          deploymentStatus: "completed",
        },
        {
          index: 1169,
          address: "EQCJRAYKf_lp8NORtsLcfj3ueR8-PRQs_msagwqj50DYdHhE",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "17.json",
      supply: 30,
      currentSupplyIndex: 30,
      copies: [
        {
          index: 1170,
          address: "EQCocmsQgOYmtbqLxUAERHnxtK9zFxhTVuwA-CuUlzAnLQGv",
          deploymentStatus: "completed",
        },
        {
          index: 1171,
          address: "EQBgySb928f5Y3pOOKtPKRkbirWb-oT9igxvdb99whF7vj4X",
          deploymentStatus: "completed",
        },
        {
          index: 1172,
          address: "EQDxm2fxW4G8XREXq5jjcM9Yalrfih_v7u_4-9x5wDubSrVn",
          deploymentStatus: "pending",
        },
        {
          index: 1172,
          address: "EQDxm2fxW4G8XREXq5jjcM9Yalrfih_v7u_4-9x5wDubSrVn",
          deploymentStatus: "completed",
        },
        {
          index: 1173,
          address: "EQDUEnWZsE8Ck0B2ccAP-RL1uHdvt5gfMamh8VIc_wNJN7qC",
          deploymentStatus: "completed",
        },
        {
          index: 1174,
          address: "EQBy_8BXDAP6HUJbqzAO7595eAD0lf0l5YLe7KriOtPN834f",
          deploymentStatus: "completed",
        },
        {
          index: 1175,
          address: "EQB6NPTktrV5Qcq3vP4HlA0sVOTX8IOdKSHD5LryrUNuS3BE",
          deploymentStatus: "completed",
        },
        {
          index: 1176,
          address: "EQDx2_ct6SGgP0a9ZjVxDQiiKebEcsiN_XUgNKz6QyYiPSsk",
          deploymentStatus: "completed",
        },
        {
          index: 1177,
          address: "EQD1UviwAhn8t5KtxJTtTWx__jnf3c8eBFraS8FEmI-mgT8x",
          deploymentStatus: "completed",
        },
        {
          index: 1178,
          address: "EQA5af2aHkpNnfCgt-JvSNrqIg2nA7C20M6tlx675Vqyw3df",
          deploymentStatus: "completed",
        },
        {
          index: 1179,
          address: "EQB7csFFH9oyGTx72Tyw4n8nkXlsR1tjhIARBConP6-1DtxN",
          deploymentStatus: "completed",
        },
        {
          index: 1180,
          address: "EQAPfMEzGnYA2DIi0SZfIGUT2l6hvAJxEPdnies6oy-NBOcN",
          deploymentStatus: "pending",
        },
        {
          index: 1180,
          address: "EQAPfMEzGnYA2DIi0SZfIGUT2l6hvAJxEPdnies6oy-NBOcN",
          deploymentStatus: "completed",
        },
        {
          index: 1181,
          address: "EQCmeyQFI5ixvTGTm2neqxdeHIK5DHVCbIoOCPZCT9KRm8sr",
          deploymentStatus: "completed",
        },
        {
          index: 1182,
          address: "EQDzuoxkMCl-C-IUU_HiCy6Fv-ihCed5YH48I-U2zH8Zd4Qa",
          deploymentStatus: "completed",
        },
        {
          index: 1183,
          address: "EQBueRtbtYWpAwMAVJIsIKh4x9FR8OPvbDuoO_jSrkypwLtL",
          deploymentStatus: "completed",
        },
        {
          index: 1184,
          address: "EQBNRajdwMtnEz-jq5-Ej3vwnSNKW1_gTzWTrIUT0jX3lqBQ",
          deploymentStatus: "completed",
        },
        {
          index: 1185,
          address: "EQDV3cMdziG96Bknml5qufP_hZLPsUYqMtbt2EooJYTVDy_B",
          deploymentStatus: "completed",
        },
        {
          index: 1186,
          address: "EQCL-zoHcudKlKxPhsxILtYnthBEvk2hpyNgxjZm1D_oWvgp",
          deploymentStatus: "completed",
        },
        {
          index: 1187,
          address: "EQDNZzo_3nsPYAeysE9iHX-fuNOZ3UMiBHQSyV9s4Y63ZEjT",
          deploymentStatus: "completed",
        },
        {
          index: 1188,
          address: "EQDU96iceH_FnwEf2W0kt5Uq5ac5BubxD6cojdbc3pykLqSw",
          deploymentStatus: "completed",
        },
        {
          index: 1189,
          address: "EQDWZbw5OPXiQ2zVZDfcKqoLJLvtxVB4AJUH_fKs1zH9wNQT",
          deploymentStatus: "pending",
        },
        {
          index: 1189,
          address: "EQDWZbw5OPXiQ2zVZDfcKqoLJLvtxVB4AJUH_fKs1zH9wNQT",
          deploymentStatus: "completed",
        },
        {
          index: 1190,
          address: "EQCwt1DsY1-cM1AEgPw6dhPJ-_lsSFN6UB3dHNW3i-Y5Iwrw",
          deploymentStatus: "completed",
        },
        {
          index: 1191,
          address: "EQCDRric3uybqHr9zJUjFc2cNUhs3LgX7GoiJ_oymwS-tID5",
          deploymentStatus: "completed",
        },
        {
          index: 1192,
          address: "EQApBxW_PxzjOGe5UalaZSW13b7UWKk5osLKms8bP0ZGDjD8",
          deploymentStatus: "completed",
        },
        {
          index: 1193,
          address: "EQCPu45NF3L4BFJH2eTAW7V3Y5g16qHnHaP767ulRp-BE5mK",
          deploymentStatus: "completed",
        },
        {
          index: 1194,
          address: "EQDKEMbXlQ_eyki0TFENZ8agZaR6TRjKAz8J8d5AqmXC0vzU",
          deploymentStatus: "completed",
        },
        {
          index: 1195,
          address: "EQAYYrRi7l18AYBA_5_wp9-xieh0PyWMBKRfkGH-hFnxbFHu",
          deploymentStatus: "completed",
        },
        {
          index: 1196,
          address: "EQAC7ib2Xo6JaDagudtg_mG2pc746ScKwJDa_jmcBimrZvaO",
          deploymentStatus: "completed",
        },
        {
          index: 1197,
          address: "EQD4Dc9EqXWhLj7Y2GmdivD6yghPmqy_CCwRgTC_JnOXt6U_",
          deploymentStatus: "completed",
        },
        {
          index: 1198,
          address: "EQBUSAMndK95w6DLxgH776ojfykg33TQLliH9D3FnP-8Nbbc",
          deploymentStatus: "pending",
        },
        {
          index: 1198,
          address: "EQBUSAMndK95w6DLxgH776ojfykg33TQLliH9D3FnP-8Nbbc",
          deploymentStatus: "completed",
        },
        {
          index: 1199,
          address: "EQDl_jcFn3jIpABsmRFcthKYkIxlV8mYTOx08JmpG920kQ3t",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "19.json",
      supply: 50,
      currentSupplyIndex: 50,
      copies: [
        {
          index: 1200,
          address: "EQDWSdVZ1JJdVpWiccwSJcEj5vDajc5E7dzEK8SQ2MFtYIQ-",
          deploymentStatus: "completed",
        },
        {
          index: 1201,
          address: "EQCIrlDOB7lh9ZuggIYNFC2neFnl6wXCAn7HVUHtgykjXiVD",
          deploymentStatus: "completed",
        },
        {
          index: 1202,
          address: "EQCZ5IrIQAf7tETg5JfX_M3U2nESFbVZp_6zcRfRGsgobWLb",
          deploymentStatus: "completed",
        },
        {
          index: 1203,
          address: "EQDpdRiES5Wt4vlQHeaA9A4RqUICXlv2oovmJF7g2sechlgr",
          deploymentStatus: "completed",
        },
        {
          index: 1204,
          address: "EQDjelziVmN7b-KKxx9X57WSE_AYeK_MsumBJr_T68hpiOUH",
          deploymentStatus: "completed",
        },
        {
          index: 1205,
          address: "EQCH9EprJHiae9Q11QX_kuWE4Y253_7p9QVWvcS9eKtvKRcc",
          deploymentStatus: "completed",
        },
        {
          index: 1206,
          address: "EQAu2DsMIajFhfAMZv0bGj9VSQv4Mktn-HD3CJ__i7bE23fu",
          deploymentStatus: "pending",
        },
        {
          index: 1206,
          address: "EQAu2DsMIajFhfAMZv0bGj9VSQv4Mktn-HD3CJ__i7bE23fu",
          deploymentStatus: "completed",
        },
        {
          index: 1207,
          address: "EQAnSuwufeFmyXIX2SP4Y_zHV7IGYZkpKrXL2sQshDOEU7qf",
          deploymentStatus: "completed",
        },
        {
          index: 1208,
          address: "EQBcj6OLQJbOG5shmbO4fzOdrPnvt087jgZRt3CzCxAPBvTi",
          deploymentStatus: "completed",
        },
        {
          index: 1209,
          address: "EQAhS91q4WbMMyjas09iZJDAdKQfD2lHr8rej8xtGzr1gg9n",
          deploymentStatus: "completed",
        },
        {
          index: 1210,
          address: "EQB3IySxPSwkr-ApXZA28dTiRnYuQrDSJIpk1aEfLwLWzzHL",
          deploymentStatus: "completed",
        },
        {
          index: 1211,
          address: "EQCWkdBRCWHaDycA3QInrG4XoIeAyfQg8YxaYcHYw898FJME",
          deploymentStatus: "completed",
        },
        {
          index: 1212,
          address: "EQCMpsGCQ1mWtojU6um2SThXVdPI6-bkbfWiZ9r8xIk90yeU",
          deploymentStatus: "completed",
        },
        {
          index: 1213,
          address: "EQD4SIkcoP2Sb3OUtGYHc7ihRR3NSGtb8ivq_xVqScAZvUhX",
          deploymentStatus: "completed",
        },
        {
          index: 1214,
          address: "EQC9kNL4huNpfq9SSfEgYrwPukdCnkmxZXFsbAbrtJvH0uc1",
          deploymentStatus: "pending",
        },
        {
          index: 1214,
          address: "EQC9kNL4huNpfq9SSfEgYrwPukdCnkmxZXFsbAbrtJvH0uc1",
          deploymentStatus: "completed",
        },
        {
          index: 1215,
          address: "EQDRI4TtzppA2oUNniU7C9NVjQ1mF7FPQmQX7EUhQaMBGIhe",
          deploymentStatus: "completed",
        },
        {
          index: 1216,
          address: "EQBUKMNmuhu8Vc-UeQT_OnTkASgknj6kpRQHlKx_UNwm3pOb",
          deploymentStatus: "completed",
        },
        {
          index: 1217,
          address: "EQAI30922OjWC_c2yUs4C8ybe15HT5pBHXNTaOHdo7HBmmol",
          deploymentStatus: "completed",
        },
        {
          index: 1218,
          address: "EQB6abXtMa9n-nPlnghrFRDaDrLof1d_U09X7JnxztqrWokP",
          deploymentStatus: "completed",
        },
        {
          index: 1219,
          address: "EQDWAeesrZmfsB8eq_K8jyANqDCYzZOcxT-3STKm9SX9DqK9",
          deploymentStatus: "completed",
        },
        {
          index: 1220,
          address: "EQB4ee5w-rq7dwIgDcHQgCpgo6BUVF3HQL7JeK4yJoCKM2d_",
          deploymentStatus: "completed",
        },
        {
          index: 1221,
          address: "EQB7Y7CrOukq2LtFlakMy31BLP89aS-zLIvouuNHaeCucxTh",
          deploymentStatus: "completed",
        },
        {
          index: 1222,
          address: "EQAQk7OReF614YgBXFUtX2TtvAhvxnYNF5XK6oTsqAlraTOd",
          deploymentStatus: "pending",
        },
        {
          index: 1222,
          address: "EQAQk7OReF614YgBXFUtX2TtvAhvxnYNF5XK6oTsqAlraTOd",
          deploymentStatus: "completed",
        },
        {
          index: 1223,
          address: "EQA9sb1M83kxnIAmwJk0XzMmXiZwA_9jArQe8TqzWfYc7Vyo",
          deploymentStatus: "completed",
        },
        {
          index: 1224,
          address: "EQBjIFm8XCTxYkNMA9zXnlZwrushmARqavNdkOfndbz2uYl5",
          deploymentStatus: "completed",
        },
        {
          index: 1225,
          address: "EQARr60Kikg5Ea3j6YkCH0KEY8auC7amTdA_vSkolnBXJUBK",
          deploymentStatus: "completed",
        },
        {
          index: 1226,
          address: "EQBZ8s1XQNgFILgcaZRyjwc6npPypjILJLrBnUcbvq1mH7tm",
          deploymentStatus: "completed",
        },
        {
          index: 1227,
          address: "EQCjRnnzhjqBpKmR8-wNLf_Xyc6UYLP4xGYgfziAK5cTBU1y",
          deploymentStatus: "completed",
        },
        {
          index: 1228,
          address: "EQA6GItaOzK9xjV1eHloWXn35Stz4yPxRivhYNk9ZbNfH_Pc",
          deploymentStatus: "completed",
        },
        {
          index: 1229,
          address: "EQDK2Oz-vyjDWAZTathfQztpYr_9BLZsC3tafHJYaHBX2JjM",
          deploymentStatus: "completed",
        },
        {
          index: 1230,
          address: "EQDzff3bCn0RD1iAj8v9wksh21h4sxCAc4zZAb548ApFkIch",
          deploymentStatus: "completed",
        },
        {
          index: 1231,
          address: "EQBnI6DWe8q7GDBqjH0C_fwm2P_NSFGMFtMtXS4Sgf32OE4f",
          deploymentStatus: "pending",
        },
        {
          index: 1231,
          address: "EQBnI6DWe8q7GDBqjH0C_fwm2P_NSFGMFtMtXS4Sgf32OE4f",
          deploymentStatus: "completed",
        },
        {
          index: 1232,
          address: "EQABYfcUWjrwuRtsmUj5eryCzMYfUR8-WYi97--l0DnaXqoT",
          deploymentStatus: "completed",
        },
        {
          index: 1233,
          address: "EQAjI7gP9Tf97z4Cw-uZA7DanIHKcyFyajVgowaUwLzCtAEG",
          deploymentStatus: "completed",
        },
        {
          index: 1234,
          address: "EQDYbh2V8isqy8KbBTGhavs8d5yruoUIYW9PZy7TB3N_F9UL",
          deploymentStatus: "completed",
        },
        {
          index: 1235,
          address: "EQAklF2dbfhIB7iWL2x49HNsG_7JGctkF7ojZuye8f0Ai1Zw",
          deploymentStatus: "completed",
        },
        {
          index: 1236,
          address: "EQDZSkMok0SNg51uqJy5rfHBV5NoOJwXAyGJSXEirzdttQ3Y",
          deploymentStatus: "completed",
        },
        {
          index: 1237,
          address: "EQAxjztigmZBLNApJx_ucgenI817mgg_WVuk0B3pCVAWPwpB",
          deploymentStatus: "completed",
        },
        {
          index: 1238,
          address: "EQAnVIJfuPOodo177oEVjuxYBrqFEiKT3-TPuqOV5W4txZuP",
          deploymentStatus: "completed",
        },
        {
          index: 1239,
          address: "EQBQW5r-9XyW0kSdnKDTmLbPmulRmZ5PL5yEXsZNSzFrg3Hz",
          deploymentStatus: "completed",
        },
        {
          index: 1240,
          address: "EQAXphNSyuWlUxtRyBFAB8iUXZNVkwhaZOUrNPrL4SsySOi7",
          deploymentStatus: "pending",
        },
        {
          index: 1240,
          address: "EQAXphNSyuWlUxtRyBFAB8iUXZNVkwhaZOUrNPrL4SsySOi7",
          deploymentStatus: "pending",
        },
        {
          index: 1240,
          address: "EQAXphNSyuWlUxtRyBFAB8iUXZNVkwhaZOUrNPrL4SsySOi7",
          deploymentStatus: "completed",
        },
        {
          index: 1241,
          address: "EQADuS2btyTxAF3DRivb058kTdEal2VgFtJ-EOtvfBReuISf",
          deploymentStatus: "completed",
        },
        {
          index: 1242,
          address: "EQDu01MDagv8nsYsftrLXLgQa-0Sr73RIXyvnCCfJuH239nx",
          deploymentStatus: "completed",
        },
        {
          index: 1243,
          address: "EQCD5AJMLv7O4kdHu4NSQabs8T9ycVW4YTly8jzj2EpX2zJw",
          deploymentStatus: "completed",
        },
        {
          index: 1244,
          address: "EQA7V2KynQV29bRAjrTi9RV8hh1QuIoOD689JeUX709kbGDT",
          deploymentStatus: "completed",
        },
        {
          index: 1245,
          address: "EQC_EGP--7_6xsKalA_GPQA80GgoVRD4g3RS35JQAidTdSkx",
          deploymentStatus: "completed",
        },
        {
          index: 1246,
          address: "EQDhfVFoP6lxHLqxxJnje4TNz_Xv1kg1MhcUgfCuQDiDc4Zy",
          deploymentStatus: "completed",
        },
        {
          index: 1247,
          address: "EQDF5Y1DKM9SndsLZzyRDpELKPJx6LgQGfEDIWGXVkvlmgdf",
          deploymentStatus: "completed",
        },
        {
          index: 1248,
          address: "EQAl5dvVU1gDKI3aVgV3a3dGCMQv2ibuf5o9Cx4vXavIdhAc",
          deploymentStatus: "pending",
        },
        {
          index: 1248,
          address: "EQAl5dvVU1gDKI3aVgV3a3dGCMQv2ibuf5o9Cx4vXavIdhAc",
          deploymentStatus: "completed",
        },
        {
          index: 1249,
          address: "EQAkR5L5iOslx0LF9WGkld4RrkUWYkK2nO13AHUVmCwrhVb0",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "20.json",
      supply: 30,
      currentSupplyIndex: 30,
      copies: [
        {
          index: 1250,
          address: "EQD8Z3Xwc28rs_lyi4kuHKVFGmvnjFNNIW5jAuntzaevUhMg",
          deploymentStatus: "completed",
        },
        {
          index: 1251,
          address: "EQBu-Hvqx5cz0R1BY3KNwrl6KRSDDBGy-Tuf_SikK0Fq4BmU",
          deploymentStatus: "completed",
        },
        {
          index: 1252,
          address: "EQDMI6fzqOPLPTMrGjLKwpRJVv6w8eoPB-KiXoFpn2KsZIC8",
          deploymentStatus: "completed",
        },
        {
          index: 1253,
          address: "EQCpgc2NUADGNJqcTkAvLpjYgR2emIFjQTeeRyf30yy8N8gs",
          deploymentStatus: "completed",
        },
        {
          index: 1254,
          address: "EQCntfmBrG9cVcOdM7uDnPydFcmgq7fqXZ0KPE2ctrckairi",
          deploymentStatus: "completed",
        },
        {
          index: 1255,
          address: "EQBU63SUpQ8BmlqVOd5dBknFd8KhB2WMf5h6spLTl_ZT109m",
          deploymentStatus: "completed",
        },
        {
          index: 1256,
          address: "EQBqnOuSOm7Ze9EDdiWQmKHL31Hs9CJ9G6xi3o91BMVKQUcW",
          deploymentStatus: "pending",
        },
        {
          index: 1256,
          address: "EQBqnOuSOm7Ze9EDdiWQmKHL31Hs9CJ9G6xi3o91BMVKQUcW",
          deploymentStatus: "completed",
        },
        {
          index: 1257,
          address: "EQAPQ70NSkY6WuxminuYbQ5HblZQR9vB4YGCXZkVfr_8pVNj",
          deploymentStatus: "completed",
        },
        {
          index: 1258,
          address: "EQDyHyb8M_eXIkR1quuBF7Q7nULfBDjE1NR-eB7VVJcrubnL",
          deploymentStatus: "completed",
        },
        {
          index: 1259,
          address: "EQAiBe8QEoDLV3rEDj76ekk02aVDHe5GL720bO6DKgovyN05",
          deploymentStatus: "completed",
        },
        {
          index: 1260,
          address: "EQC1GRMzbr29FK6w5IbtGXc-a4tWhmZwuaFprnXbjAApffAd",
          deploymentStatus: "completed",
        },
        {
          index: 1261,
          address: "EQDKOrdGl8fdlH_XGKQ2Jiz8v9jKbX2gKoJJavh2qqWFFbo0",
          deploymentStatus: "completed",
        },
        {
          index: 1262,
          address: "EQAo7trPSEnF_hmqMBydbFvIbSk3g5ehNKuSdeRWiQR5PBKh",
          deploymentStatus: "completed",
        },
        {
          index: 1263,
          address: "EQDrXGZuv8ZPc-A9MWk16nYWuObr4GfX-nsOu7h3PST8DlIZ",
          deploymentStatus: "completed",
        },
        {
          index: 1264,
          address: "EQB9pS2pGXf2pCnFvfJABxPAMqjwrtnFcofOVUXAbhujjfLB",
          deploymentStatus: "pending",
        },
        {
          index: 1264,
          address: "EQB9pS2pGXf2pCnFvfJABxPAMqjwrtnFcofOVUXAbhujjfLB",
          deploymentStatus: "completed",
        },
        {
          index: 1265,
          address: "EQAtumqDylqca0IZBqL0nptiv9cRRXctZVHtabRnu0tJgTkU",
          deploymentStatus: "completed",
        },
        {
          index: 1266,
          address: "EQDExcJv6rswLQRPQ7NIhHOmQAdwdZuqR_JwFtwtcQvexeTr",
          deploymentStatus: "completed",
        },
        {
          index: 1267,
          address: "EQDDEDwWwNLoqstOhEQo6XOYVDIE186PWOyzVoEy31fDyQGT",
          deploymentStatus: "completed",
        },
        {
          index: 1268,
          address: "EQA8vNBHXilkMhjk50VRdzPkKEwcqtejJRrh8l8oGQjH8D0E",
          deploymentStatus: "completed",
        },
        {
          index: 1269,
          address: "EQDo7Yu3Bgjg99TuWbxO3uEFy3qzhHDS8I4ZjgQgQUNT3rJx",
          deploymentStatus: "completed",
        },
        {
          index: 1270,
          address: "EQBtmqRNEhslpjec25xNTHCJNzkYfwZO-QoR-x4NsL4K0vVO",
          deploymentStatus: "completed",
        },
        {
          index: 1271,
          address: "EQCSyK62oS2BYCIVqK2U-1fSsxvq_Ua0NVxq3zqPNhkmSwn7",
          deploymentStatus: "completed",
        },
        {
          index: 1272,
          address: "EQC48q9VhVm-LwD03fpw6UQ5_iYYIofZJUZvGXvVY0yhutdN",
          deploymentStatus: "completed",
        },
        {
          index: 1273,
          address: "EQDZUfu888rmiuspDOsV-cUfcCBJTzAQ7eC-PTUY5DGXoH7k",
          deploymentStatus: "pending",
        },
        {
          index: 1273,
          address: "EQDZUfu888rmiuspDOsV-cUfcCBJTzAQ7eC-PTUY5DGXoH7k",
          deploymentStatus: "completed",
        },
        {
          index: 1274,
          address: "EQBUHgx-LTBG6syntMy9iDnDf5MxIsMoO25VwODT0VtbZjZH",
          deploymentStatus: "completed",
        },
        {
          index: 1275,
          address: "EQD7eHcFAw4T7MbXB6D8HjAIOmV0FpaTUx-vpPwOSMwbIvWl",
          deploymentStatus: "completed",
        },
        {
          index: 1276,
          address: "EQA3nKSsmL3xcLf_GQx9hPwKQSBg0LCrnl8gJ1EWqMbolwqL",
          deploymentStatus: "completed",
        },
        {
          index: 1277,
          address: "EQBT0-oy4bSH-BH3SbqMNHAdlGxO_sUXfCG8LNdc5FWWB6nS",
          deploymentStatus: "completed",
        },
        {
          index: 1278,
          address: "EQBll6OylXGjzXy1CqQfalqg64R6FBkNQTJNJmKTixDhJsRd",
          deploymentStatus: "completed",
        },
        {
          index: 1279,
          address: "EQCSNpewkW61FcNNO5izVDwLEdiSWImgGpgWKyN1TBZiQur1",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "21.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 1280,
          address: "EQDvJCXk3dbZFfHj6EpxAzL7CbUHGVPvjrWdPQrhDGncoXe8",
          deploymentStatus: "completed",
        },
        {
          index: 1281,
          address: "EQBsgmzcjnYnisAiSuYGS4qW81f-fhBW8xIlh1qRgE7E5erI",
          deploymentStatus: "pending",
        },
        {
          index: 1281,
          address: "EQBsgmzcjnYnisAiSuYGS4qW81f-fhBW8xIlh1qRgE7E5erI",
          deploymentStatus: "completed",
        },
        {
          index: 1282,
          address: "EQBGZMNJXxgPGlTXCvNeYMbHStoW4WNuKhWxEzSKcAhGk86a",
          deploymentStatus: "completed",
        },
        {
          index: 1283,
          address: "EQAy4VJj8nhyfVFzLGSzawHMX6T-9FpjJN_SilxQQsCdZuBJ",
          deploymentStatus: "completed",
        },
        {
          index: 1284,
          address: "EQBt1hMXC-sFnlKs5wVreBkMyo2g4aBKb1mVdIyNXQgP7dzO",
          deploymentStatus: "completed",
        },
        {
          index: 1285,
          address: "EQAPr893EOzGXFaEgDkHgvh7eG7-Hch0yeBsKL15AZSbuVk2",
          deploymentStatus: "completed",
        },
        {
          index: 1286,
          address: "EQBloqmk0dLNB7YG5OlTRH1YH377UHEjLaoAVFw5SUvEg_zb",
          deploymentStatus: "completed",
        },
        {
          index: 1287,
          address: "EQBBeSRP_Z99bOi9YgRMqkjStEQBC1acAshY6bBYpPWAmlOZ",
          deploymentStatus: "completed",
        },
        {
          index: 1288,
          address: "EQBL_1NNHGCok_Dopci-Rk9Ivsk99W3EsQE05nlYLVBdGojW",
          deploymentStatus: "completed",
        },
        {
          index: 1289,
          address: "EQDTv5f2kI1iPx1PI45PUd6c2nijE0_AGagLBPxEQwcMpsdl",
          deploymentStatus: "completed",
        },
        {
          index: 1290,
          address: "EQBnseFJmsaixiem3OsGhqxKCuBu4OaABbExb_4LDsRSlPOc",
          deploymentStatus: "pending",
        },
        {
          index: 1290,
          address: "EQBnseFJmsaixiem3OsGhqxKCuBu4OaABbExb_4LDsRSlPOc",
          deploymentStatus: "completed",
        },
        {
          index: 1291,
          address: "EQAVXMYm11ijiHlysdGMIZ29M8cCI52Yjtb9cYTzwrUSRow9",
          deploymentStatus: "completed",
        },
        {
          index: 1292,
          address: "EQD1sGJo0r1r2DcVRLXZlvbvMSoc7N3-4TUDWX6kkakIx2to",
          deploymentStatus: "completed",
        },
        {
          index: 1293,
          address: "EQAsEd--k2PVlu-HuiOuoquhEvLK2h0fEo5Yk6U4Ze4hMoBk",
          deploymentStatus: "completed",
        },
        {
          index: 1294,
          address: "EQCCxXALjpiiiBQjaK1xWC-cynr3eHLTGSlzLMdo2nSXdPqT",
          deploymentStatus: "completed",
        },
        {
          index: 1295,
          address: "EQAJIO8E_j3gtZa0JZTWRUs5NSccObmgL9TrPL9mXG4uE5u-",
          deploymentStatus: "completed",
        },
        {
          index: 1296,
          address: "EQAnFrpq2R0mUo1i0KJQ5KUVjOqwezr0DZioddIG0qEQ5vAU",
          deploymentStatus: "completed",
        },
        {
          index: 1297,
          address: "EQAZ5mx4GR1YMtID_wKdQGuQ8kPVMXn4EUBBDaOkC-rDho1e",
          deploymentStatus: "completed",
        },
        {
          index: 1298,
          address: "EQBOu-wNZ-zs7mKKbZSfLxNzN-mnP5hVhfKJTla1a4kpVPsB",
          deploymentStatus: "completed",
        },
        {
          index: 1299,
          address: "EQBKDY6W45BIGSSb1XUOOcyKe6KoklLxW6JTpdIqOiL2u7Jh",
          deploymentStatus: "pending",
        },
        {
          index: 1299,
          address: "EQBKDY6W45BIGSSb1XUOOcyKe6KoklLxW6JTpdIqOiL2u7Jh",
          deploymentStatus: "completed",
        },
        {
          index: 1300,
          address: "EQB-MzE_XIG-U-CT52zPFhWU-L5zSEPetXl92rXsPquk2Tji",
          deploymentStatus: "completed",
        },
        {
          index: 1301,
          address: "EQCV7_FaK3VVLfUn52nX7hzlgmTuHhY5spP1FFS29FshdZ_G",
          deploymentStatus: "completed",
        },
        {
          index: 1302,
          address: "EQCqZa9VvarH_nAgDYJam3iNVlgar90rsd9JPv9MRXNx_ZSy",
          deploymentStatus: "completed",
        },
        {
          index: 1303,
          address: "EQDfNiG_b_R2_3dTYWs1zvhbIEPD6XrMXRts-RoYp53K0lSj",
          deploymentStatus: "completed",
        },
        {
          index: 1304,
          address: "EQBMyci-JG8sqF0nUDN0QISa-Aph89ke-pKXd5UVbffWbFzc",
          deploymentStatus: "completed",
        },
        {
          index: 1305,
          address: "EQDSvZyFOQ-AnPOfC-fLTASWPo5rQg776yIyXrQ9mcJ89djW",
          deploymentStatus: "completed",
        },
        {
          index: 1306,
          address: "EQCSzfEKFOK37dnPotUWz_2ByJeXLAJXUHWgRjFqd64xGOvE",
          deploymentStatus: "completed",
        },
        {
          index: 1307,
          address: "EQDgKj0uxdxHgq2j0TjHbuO0n23d6g1CK-O_Fq2b7Lx2mreI",
          deploymentStatus: "pending",
        },
        {
          index: 1307,
          address: "EQDgKj0uxdxHgq2j0TjHbuO0n23d6g1CK-O_Fq2b7Lx2mreI",
          deploymentStatus: "completed",
        },
        {
          index: 1308,
          address: "EQDgHYhfKt5OftmwpIV5i-Fdnh18e33LH2krVvK9S77EB55T",
          deploymentStatus: "completed",
        },
        {
          index: 1309,
          address: "EQBzgskBiU8Gft-Oj67BM7UH0xp_MOivodtsimU2LzpxLP-d",
          deploymentStatus: "completed",
        },
        {
          index: 1310,
          address: "EQA-WbZPQUT6veHyPeh1G9sgyVNUQj5oFomtNR6GKMTqR1Vy",
          deploymentStatus: "completed",
        },
        {
          index: 1311,
          address: "EQCa2ClS_K9TtM9BOqnkYSbLLnrNog3x7Y0ALlZiqYjkSMWM",
          deploymentStatus: "completed",
        },
        {
          index: 1312,
          address: "EQB5zgdKbnJw7gGdllUK6ncI7P7Y4bT7VVSDHXINsyTSFx43",
          deploymentStatus: "completed",
        },
        {
          index: 1313,
          address: "EQCdISqptCMpc0OFSBEaap3irxiInZgB5K6phsd7fkD0zy-H",
          deploymentStatus: "completed",
        },
        {
          index: 1314,
          address: "EQARbQtKKGfC6JyDWpxbnKqbmE27TKqxCTGe-fD67cA2zEZk",
          deploymentStatus: "completed",
        },
        {
          index: 1315,
          address: "EQB4DkjjAVxX03MLJbVU7wj5SduIpZaCtBgkNFoNPQyQaHQW",
          deploymentStatus: "pending",
        },
        {
          index: 1315,
          address: "EQB4DkjjAVxX03MLJbVU7wj5SduIpZaCtBgkNFoNPQyQaHQW",
          deploymentStatus: "completed",
        },
        {
          index: 1316,
          address: "EQDxx4xC0Y4vCTD30XaE0P7LSMpxHEFdYeFX_02F_BEisr1j",
          deploymentStatus: "completed",
        },
        {
          index: 1317,
          address: "EQAvt_lo6GrcwLQQeP2LM1YDmIWgce655EwicY-lpd6ayG1Z",
          deploymentStatus: "completed",
        },
        {
          index: 1318,
          address: "EQCF4LW5e9JZjTGhH-ciJr-j01oUdbw_M9jkXmSdTG9AWbXR",
          deploymentStatus: "completed",
        },
        {
          index: 1319,
          address: "EQDzFu8xslY9pYS_HD526c-cMkHmjy7I41bUNYu-JqN1vjGu",
          deploymentStatus: "completed",
        },
        {
          index: 1320,
          address: "EQCSivwG4w1Ta0sz1OwGteAO-i8rXwzRqHJfB5i6Y2guUAcF",
          deploymentStatus: "completed",
        },
        {
          index: 1321,
          address: "EQA4sDfyRddVYgpGTTg7dqIdDg9MazrMi5XD_eMs43T4KoLA",
          deploymentStatus: "completed",
        },
        {
          index: 1322,
          address: "EQAO9Nd_sUxwifaTz3rmeJ7Snt6f23Z7MW34QYO4RkCIKBnP",
          deploymentStatus: "completed",
        },
        {
          index: 1323,
          address: "EQCUTbAktI6vJrHSgGQfsQjWta1-96g57w7PC4CVNXKMA-5n",
          deploymentStatus: "completed",
        },
        {
          index: 1324,
          address: "EQBm_aCEpJAoCA2aKZrD7NWJPThTLlk9VlUiVlhU4VyTLNYj",
          deploymentStatus: "pending",
        },
        {
          index: 1324,
          address: "EQBm_aCEpJAoCA2aKZrD7NWJPThTLlk9VlUiVlhU4VyTLNYj",
          deploymentStatus: "pending",
        },
        {
          index: 1324,
          address: "EQBm_aCEpJAoCA2aKZrD7NWJPThTLlk9VlUiVlhU4VyTLNYj",
          deploymentStatus: "completed",
        },
        {
          index: 1325,
          address: "EQDaFVPQ_Je7_bU8KNmClx7wSYx0xmVHklSqFCY-aPSp8VzQ",
          deploymentStatus: "completed",
        },
        {
          index: 1326,
          address: "EQB2buvCFrIVNdE-irtgv529uOGTfCNwhyxQoj7wFGc9wG-e",
          deploymentStatus: "completed",
        },
        {
          index: 1327,
          address: "EQAvSqtX41Y8SakXbEB9YwAEq3W2oFAJJtpxxTM-ml2GZKD7",
          deploymentStatus: "completed",
        },
        {
          index: 1328,
          address: "EQD7Zjj43L2c_P9WQqg_kIX4UVkj8AZi9Jm_YpWAcM7Vmaz9",
          deploymentStatus: "completed",
        },
        {
          index: 1329,
          address: "EQADlw7csAsdMZ4F11K3EIMySzjNyGqGvKJoyStYk7YVIKqI",
          deploymentStatus: "pending",
        },
        {
          index: 1329,
          address: "EQADlw7csAsdMZ4F11K3EIMySzjNyGqGvKJoyStYk7YVIKqI",
          deploymentStatus: "completed",
        },
        {
          index: 1330,
          address: "EQDBED9rJrd3Y7Rj8Zcqbk3a5wV5BPK7aRSSi3yg6oj-ohpm",
          deploymentStatus: "completed",
        },
        {
          index: 1331,
          address: "EQC-ag2wqYHkNAxM1XcMiYEnJQFJX-3hTalC5bsGDBUmELQN",
          deploymentStatus: "completed",
        },
        {
          index: 1332,
          address: "EQAAb1JxTqli_QtsKibm64eMAN975T13n81FosT7JIrqJ48C",
          deploymentStatus: "completed",
        },
        {
          index: 1333,
          address: "EQCigxqNune5tJ57InNTq1UjBZ9-xL4hmBccfh62OSL5-5hG",
          deploymentStatus: "completed",
        },
        {
          index: 1334,
          address: "EQCxDleJCN6yIALdwTrplQIs1mgL2c-cEUbLON4SUlr7D-HV",
          deploymentStatus: "completed",
        },
        {
          index: 1335,
          address: "EQC7fcsQlyQK4cEOTVsjQx9i85DpFZE6yNZf5v39ix1B0lYX",
          deploymentStatus: "completed",
        },
        {
          index: 1336,
          address: "EQCKrR__6RX6TUH7r8Dlw_HoTnG9QK-_rd0tLv6pNeCPCJGT",
          deploymentStatus: "completed",
        },
        {
          index: 1337,
          address: "EQADOhmedlw13imnoR1z9Ag_6n1iDXNhYbcpIvQz4qNHhRHR",
          deploymentStatus: "completed",
        },
        {
          index: 1338,
          address: "EQA0PwvN9N2xBkwW2oaG-SeGdP5BewSDSNdnabBkrZ_muNOu",
          deploymentStatus: "completed",
        },
        {
          index: 1339,
          address: "EQD9XIi8XMn4LmFjdJEn51Kr-chBOLtYbYvkkg7BC_mOSHVg",
          deploymentStatus: "pending",
        },
        {
          index: 1339,
          address: "EQD9XIi8XMn4LmFjdJEn51Kr-chBOLtYbYvkkg7BC_mOSHVg",
          deploymentStatus: "completed",
        },
        {
          index: 1340,
          address: "EQBZ5YX_fMxYTYauSneRCyCVuQOTVVIEx7iB-YQGOFoiKwX9",
          deploymentStatus: "completed",
        },
        {
          index: 1341,
          address: "EQBL6kLu97HJVwk5ZH9g6U2OvrsggeLqdMwcJWhO4X3j0Apd",
          deploymentStatus: "completed",
        },
        {
          index: 1342,
          address: "EQAwyzhOJipyDRl75isuu80aNDctkaAR58odCVST1FBN3tVy",
          deploymentStatus: "completed",
        },
        {
          index: 1343,
          address: "EQBaXghKJVwCb0xbxWvjpOZfSeTQaxeWbdKxZ8ZFcB0JA_hb",
          deploymentStatus: "completed",
        },
        {
          index: 1344,
          address: "EQBDsK7LVR5VhjiMyUBQpfc1azOZHbkGHvLRgE2ReeYSg-Ng",
          deploymentStatus: "completed",
        },
        {
          index: 1345,
          address: "EQD31CwJPQMKjAKdJtQl45WbRKL67D7SiD7w16_Qh5o80Qf_",
          deploymentStatus: "completed",
        },
        {
          index: 1346,
          address: "EQDIVMrUAGz9tzignhAbEtL8KI0Tc5Fz732fTNR6dMIhERF9",
          deploymentStatus: "completed",
        },
        {
          index: 1347,
          address: "EQBWFW-KRvdLWcEHm3xh8JV1qzyBfc3SRwLtZy5j2pP5WMEy",
          deploymentStatus: "pending",
        },
        {
          index: 1347,
          address: "EQBWFW-KRvdLWcEHm3xh8JV1qzyBfc3SRwLtZy5j2pP5WMEy",
          deploymentStatus: "completed",
        },
        {
          index: 1348,
          address: "EQBE4kfT0-8pgDl7gTuAeOg1R2IzFToLS2IpffFxYGIqC_d_",
          deploymentStatus: "completed",
        },
        {
          index: 1349,
          address: "EQAxkGVwrM5EI8IT8M_VCQobJSAyyBJCUTjuowAE7uie6iUp",
          deploymentStatus: "completed",
        },
        {
          index: 1350,
          address: "EQDvqta-xdB6I_fMsiZTXEniv56zUDnN6l2a8IrkzkW8iolV",
          deploymentStatus: "completed",
        },
        {
          index: 1351,
          address: "EQBxk2RF9DzrpyHNBfRH39KLlL1ubvQwEoREZXyCxTTyEzl1",
          deploymentStatus: "completed",
        },
        {
          index: 1352,
          address: "EQBaMeWaXwhAeKkQvpytXuIb7QFQs7DPxc0tBFy1HaNQalpr",
          deploymentStatus: "completed",
        },
        {
          index: 1353,
          address: "EQD51fdmJGbAnCk9to7e3H5REXAr7AqUY12mbJp8LZR9YsQH",
          deploymentStatus: "completed",
        },
        {
          index: 1354,
          address: "EQAsm_WiKZMCHUKDG8rOBbiDYdeW213jz_v6zhjOa1p7r2q2",
          deploymentStatus: "completed",
        },
        {
          index: 1355,
          address: "EQC0bSXq-hO6utxGNes_jvpDjPZtUHKMO5gdA_jIh_m3lbmU",
          deploymentStatus: "pending",
        },
        {
          index: 1355,
          address: "EQC0bSXq-hO6utxGNes_jvpDjPZtUHKMO5gdA_jIh_m3lbmU",
          deploymentStatus: "completed",
        },
        {
          index: 1356,
          address: "EQDkOyuWkQ_FM5TSOqqcVFmsbv41Q6BbfMlYomtElvIOmjcZ",
          deploymentStatus: "completed",
        },
        {
          index: 1357,
          address: "EQCfBkgv2SkwpPt8lmcxQMBI8QnPTvwBEW5NFsocrSEZF7lM",
          deploymentStatus: "completed",
        },
        {
          index: 1358,
          address: "EQCtdMS8HodPayS-Yh3A1R2TVzWH1ctNBSruOb-4wPfsQrtq",
          deploymentStatus: "completed",
        },
        {
          index: 1359,
          address: "EQAdASiPRq1CrhXGGCUd7B5LngT2PB16Ljk_m9-uL-jNbMGz",
          deploymentStatus: "completed",
        },
        {
          index: 1360,
          address: "EQDc8EyK84llTWYKH4pOAgWcsE4hhSQGZ11mmtEcMoAgzT9V",
          deploymentStatus: "completed",
        },
        {
          index: 1361,
          address: "EQBy29M8E3WT1dw9xv066u3yJHU7G3AZOzbEUGS1_oxeW5Bu",
          deploymentStatus: "completed",
        },
        {
          index: 1362,
          address: "EQB8QfUmQhv98wM8Q48yaQt4-LC5QL8DMnkCCzOYcRAtnuyp",
          deploymentStatus: "completed",
        },
        {
          index: 1363,
          address: "EQBXg4rywyytAA-_4HWkeXQT0GUR27OTR9pMTXIah-4eKHgg",
          deploymentStatus: "completed",
        },
        {
          index: 1364,
          address: "EQCUXqY3lhiwlMQRT-W5oM2ySFEss7jMXHBR43uUbm6W-b0T",
          deploymentStatus: "pending",
        },
        {
          index: 1364,
          address: "EQCUXqY3lhiwlMQRT-W5oM2ySFEss7jMXHBR43uUbm6W-b0T",
          deploymentStatus: "completed",
        },
        {
          index: 1365,
          address: "EQC4LBpI6-sss3NR0drAT3ZJFbsK0o3yeXWrPk3hMHfzEktH",
          deploymentStatus: "completed",
        },
        {
          index: 1366,
          address: "EQCP_5LLiA9_kAyvzf9CwpQAzc4FIKKVjN6b3THj9iT58QI3",
          deploymentStatus: "completed",
        },
        {
          index: 1367,
          address: "EQAAYsO8G1GYNDZq7Y8V2DUcU0B3vZP_IdpH7yT9PamRtr6K",
          deploymentStatus: "completed",
        },
        {
          index: 1368,
          address: "EQA1NlX1rUEA-3uGnM3PHrbvK7c1WNrq5WfF_-ZsObJd3hNN",
          deploymentStatus: "completed",
        },
        {
          index: 1369,
          address: "EQC8LhAnbGZGkiH7LxdXHZYOfrGbPWBsMXOys5Wee37wCSa_",
          deploymentStatus: "completed",
        },
        {
          index: 1370,
          address: "EQBFPQCNGFrpA7JLwi__2ZwcI42P0kVXk8CM1DdFV9TKQAEv",
          deploymentStatus: "completed",
        },
        {
          index: 1371,
          address: "EQC_eF8jsi_0UYF3VpheVTvLLHETagQf_Df-KYHf65tzkca0",
          deploymentStatus: "completed",
        },
        {
          index: 1372,
          address: "EQD_ZNBbZjfhwcQB_fpPpx97EksAKIzzlOwYfOJdiJ4cUqft",
          deploymentStatus: "completed",
        },
        {
          index: 1373,
          address: "EQAloPfXQeVu02i7Hz00rxdtMsfDhhdlE9wmYbV-MJ2XbpIk",
          deploymentStatus: "pending",
        },
        {
          index: 1373,
          address: "EQAloPfXQeVu02i7Hz00rxdtMsfDhhdlE9wmYbV-MJ2XbpIk",
          deploymentStatus: "completed",
        },
        {
          index: 1374,
          address: "EQD_wbUlF8G0VURJZHROKWtkIjUcD1B4aC7Uh1OVSeN2CvN0",
          deploymentStatus: "completed",
        },
        {
          index: 1375,
          address: "EQAO80J8aX2HxvHW-RYUvhoQlx8v5Ud7XQkfrDfu55kWZAvL",
          deploymentStatus: "completed",
        },
        {
          index: 1376,
          address: "EQCIUsAGGMZvEShmXBr5OlITUkDv0Sxi9UHTwMfvpcaX7zkU",
          deploymentStatus: "completed",
        },
        {
          index: 1377,
          address: "EQDg2X-toGWMN2_R1tRUYvlk9ScB3rfuNLtmfYXGxV2uIhNf",
          deploymentStatus: "completed",
        },
        {
          index: 1378,
          address: "EQA1qj_RSpZu3g_aLMr6BBJPwZckJJ2YBcfpEuoBvZEVAWwm",
          deploymentStatus: "completed",
        },
        {
          index: 1379,
          address: "EQALnV6vFL5kx6iH676QwzZ7_MbhYwObjyl_9ZBVPR4wt9BC",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "22.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 1380,
          address: "EQAQPAvlUHEAGzg1f8-vzdBnh7HAQxAJ8y0oFuhWLkonRhj9",
          deploymentStatus: "completed",
        },
        {
          index: 1381,
          address: "EQBGh2ExueJSDDiXosgMR1tXC0LaCx0pYBWryWM0l66FsrlT",
          deploymentStatus: "pending",
        },
        {
          index: 1381,
          address: "EQBGh2ExueJSDDiXosgMR1tXC0LaCx0pYBWryWM0l66FsrlT",
          deploymentStatus: "completed",
        },
        {
          index: 1382,
          address: "EQARwBUucbHhFZ6Wx2BaoVTbDX9uUzCho1-QksappWrU0YBq",
          deploymentStatus: "completed",
        },
        {
          index: 1383,
          address: "EQCEYJR5Il64ECA5HHiq9xHINoIOR2S_VSZGX-BNea_TuNDg",
          deploymentStatus: "completed",
        },
        {
          index: 1384,
          address: "EQAWdr6NTF8AA4pR-g2I80j9ObX2u7d8cuSoUkFBZO1B1Qrj",
          deploymentStatus: "completed",
        },
        {
          index: 1385,
          address: "EQCDCOPz32u_2AajeTPbVVFKBqWQSEOz2Pn86-EL3qyf4S5-",
          deploymentStatus: "completed",
        },
        {
          index: 1386,
          address: "EQCXaPj12Wycz__vdFcjyV-0TiHxQ6AYekZJka-kcPBSX4OG",
          deploymentStatus: "completed",
        },
        {
          index: 1387,
          address: "EQAN6b1X-ryILAlmQ2VFRrhDijs_FVwLLxc35lgfIahjqv3e",
          deploymentStatus: "completed",
        },
        {
          index: 1388,
          address: "EQDkyQP2wNFJDtfcOh0XTTV4K3S3QI9r9Y1Wqf3gdEn7dJQL",
          deploymentStatus: "completed",
        },
        {
          index: 1389,
          address: "EQBZfdBAJo_cwnF_p1cDdc4ubQjbE92XtBevOoJe9sN_THaD",
          deploymentStatus: "completed",
        },
        {
          index: 1390,
          address: "EQCfxuuFImI9veS5J6AUbu8gK6MlCxc_OeAH8qDwLLvmp0uY",
          deploymentStatus: "pending",
        },
        {
          index: 1390,
          address: "EQCfxuuFImI9veS5J6AUbu8gK6MlCxc_OeAH8qDwLLvmp0uY",
          deploymentStatus: "completed",
        },
        {
          index: 1391,
          address: "EQCTCEJyubE-qpsIcaiv9e5PNlJ3jJyJg0U67N6yoFJ45kFu",
          deploymentStatus: "completed",
        },
        {
          index: 1392,
          address: "EQCsBtxn4txUNkfN8U0dsPxu85RST2WGQ_XdZZpYCuPF496Z",
          deploymentStatus: "completed",
        },
        {
          index: 1393,
          address: "EQCyZfEXBPe4oQYPLHSU0_p59rJQuIvZnVLEInLqKy-ogYax",
          deploymentStatus: "completed",
        },
        {
          index: 1394,
          address: "EQA0tkJfLRPwYIXNusVhfeBaKCDuDeb9W_yQrJYBzUsxsf94",
          deploymentStatus: "completed",
        },
        {
          index: 1395,
          address: "EQC61nmpH7ZS8TgTQKjr7aQHZfFUMSUV8Fhk7f-vTYKtywB3",
          deploymentStatus: "completed",
        },
        {
          index: 1396,
          address: "EQD5VdVRJnSGnzJTwhwgxXW7dcrU8Jrgu0wUaiIEi01pzNZj",
          deploymentStatus: "completed",
        },
        {
          index: 1397,
          address: "EQBR_aNHIQHzNHzU1qH-UujFWqKp0sHUEsRtanFgsusFn3Qy",
          deploymentStatus: "completed",
        },
        {
          index: 1398,
          address: "EQAxoB8MSMDW6HdssL1HdkgRWJbSJFoGMGxvAKzDwfkyFllb",
          deploymentStatus: "pending",
        },
        {
          index: 1398,
          address: "EQAxoB8MSMDW6HdssL1HdkgRWJbSJFoGMGxvAKzDwfkyFllb",
          deploymentStatus: "completed",
        },
        {
          index: 1399,
          address: "EQANJWJiprLvep0b4jgF8nA5G0z_WeNrUCwhqgkmY9o1Y9lr",
          deploymentStatus: "completed",
        },
        {
          index: 1400,
          address: "EQD3rOWIbwoALSEU79LFf1PC4nenR_oDAoTKNouF9YdOy_2g",
          deploymentStatus: "completed",
        },
        {
          index: 1401,
          address: "EQDnudP_PWkTV-RZFaaPuGVL7AF9XDRwqLYS8Cq_LAwzpGph",
          deploymentStatus: "completed",
        },
        {
          index: 1402,
          address: "EQD504EJkVgfqtPhXYLG4JW_F2K8EFmHytDaUMHcHBSlnyF0",
          deploymentStatus: "completed",
        },
        {
          index: 1403,
          address: "EQDBLCjPSTkf6nRiS1eUN4egFXUnXPt1Gkq2KAycUWv_RKjZ",
          deploymentStatus: "completed",
        },
        {
          index: 1404,
          address: "EQDmaGIFy7Wj213OJKfqGMBwHlawpHeVfj2Nb9gX26PHKCHG",
          deploymentStatus: "completed",
        },
        {
          index: 1405,
          address: "EQBKHEpHsY9qVzCrODFcFAZFNw5mQzkU83u2Ej04GCGY8jyF",
          deploymentStatus: "pending",
        },
        {
          index: 1405,
          address: "EQBKHEpHsY9qVzCrODFcFAZFNw5mQzkU83u2Ej04GCGY8jyF",
          deploymentStatus: "completed",
        },
        {
          index: 1406,
          address: "EQABo6702segY3wfdNBDlG5pwsV4GCdsgxwqqNmu-PGVZvPS",
          deploymentStatus: "completed",
        },
        {
          index: 1407,
          address: "EQBie1-XonyLWeByyf934w1XKsLwCDmfsKVPzysCOlp7Pxbc",
          deploymentStatus: "completed",
        },
        {
          index: 1408,
          address: "EQDchXemp2vMDsfIFnriDLEwEz6_gY4GjIEbfcsdubn3DRZ_",
          deploymentStatus: "completed",
        },
        {
          index: 1409,
          address: "EQAlxTggEyidql8bOug02pI_eYQ13R8rfZuelQxUJjswDOKu",
          deploymentStatus: "completed",
        },
        {
          index: 1410,
          address: "EQDJ-tMPXx-k2TwVM8Kv4yQYmkxF7IBKK6vL0VHEIOHg_l96",
          deploymentStatus: "completed",
        },
        {
          index: 1411,
          address: "EQBlYhEB5_-OG2XXH7w5RAY_vkfAS7QPyXlpaQESfuvyEgcF",
          deploymentStatus: "completed",
        },
        {
          index: 1412,
          address: "EQDM7QoaW-4_Jtb6wCDD0jr5U-9Rxf35qkBX2IJ_zEasc8Oz",
          deploymentStatus: "completed",
        },
        {
          index: 1413,
          address: "EQDo-4m3OMqD0hDHPFyhOsPOaNPINtwm9iQNIOoK_Jl73SZS",
          deploymentStatus: "pending",
        },
        {
          index: 1413,
          address: "EQDo-4m3OMqD0hDHPFyhOsPOaNPINtwm9iQNIOoK_Jl73SZS",
          deploymentStatus: "completed",
        },
        {
          index: 1414,
          address: "EQDnIQp3x9qvr80Ni0qlyVE4CkS04bb38dnogvtUy8z_OzjG",
          deploymentStatus: "completed",
        },
        {
          index: 1415,
          address: "EQBRrEbmmYAW25CunCSSrExA7xr8d83ThG0X63K4h5yZIhwN",
          deploymentStatus: "completed",
        },
        {
          index: 1416,
          address: "EQAv4f3bxuciDlOipP5AKWHW19_DPvB0Qn48CGnP5uV7Xi9P",
          deploymentStatus: "completed",
        },
        {
          index: 1417,
          address: "EQDQmvPjIqH7zF5w3Q_qpgFEBNIOe837QyM7WkFY_Ub7HW2f",
          deploymentStatus: "completed",
        },
        {
          index: 1418,
          address: "EQAZFnFVeGy0MxgNkskffya0IjHis7Cr7oYzMS-n0j10BrqU",
          deploymentStatus: "completed",
        },
        {
          index: 1419,
          address: "EQDwtxEpeowNHWYQT1ABZzs6uSuY3kPq7Y2_gpYVBJTm-Bax",
          deploymentStatus: "completed",
        },
        {
          index: 1420,
          address: "EQDRG0knf9PaAqdTHy9hREIUS4WCqMB7kP7dvxxWY4__VrHv",
          deploymentStatus: "completed",
        },
        {
          index: 1421,
          address: "EQDjsfMuHKRQUOpnqmLzr3796VWrwjAhwkGAtT2widFKkVeK",
          deploymentStatus: "pending",
        },
        {
          index: 1421,
          address: "EQDjsfMuHKRQUOpnqmLzr3796VWrwjAhwkGAtT2widFKkVeK",
          deploymentStatus: "completed",
        },
        {
          index: 1422,
          address: "EQCgnoJ4SYFxLHoHlZXWXvo7lcxhXbl_p7xJCY6bGiCnEP5b",
          deploymentStatus: "completed",
        },
        {
          index: 1423,
          address: "EQAXfxFzAtXd3PUtgw82m_EC8jLt-cxT_W4weLPuL0i7NeMh",
          deploymentStatus: "pending",
        },
        {
          index: 1423,
          address: "EQAXfxFzAtXd3PUtgw82m_EC8jLt-cxT_W4weLPuL0i7NeMh",
          deploymentStatus: "completed",
        },
        {
          index: 1424,
          address: "EQCpl3bVE5fpk5fKCvXb-wYkuTIEPyHbeKplK9fdgEyzY9tB",
          deploymentStatus: "completed",
        },
        {
          index: 1425,
          address: "EQAINmBL3-gGOku--v31Pq7Hk3cR559f3oslw9W-sPNnueCs",
          deploymentStatus: "completed",
        },
        {
          index: 1426,
          address: "EQDeZO07HBpY6v6NyFqKN8lfEGqchbSnk0lJTGyzA43VyzBD",
          deploymentStatus: "completed",
        },
        {
          index: 1427,
          address: "EQD2IOYdWGgse3DFkRS-a-y8pvmviiYTUXYMB-P6LmROXF26",
          deploymentStatus: "completed",
        },
        {
          index: 1428,
          address: "EQCVGhYnL1ITAQRTwTcpXE2KHut8jgaK-YHFsSRkySO_gezp",
          deploymentStatus: "completed",
        },
        {
          index: 1429,
          address: "EQDrix7el6R3RK2DWxIvUxF2mmzGUecY2uydrqdApF3yDHko",
          deploymentStatus: "completed",
        },
        {
          index: 1430,
          address: "EQDMAU6bdMJLp1gF6aeuUyd6Nc7PwSj3iXyYW_6Hf-c88TOz",
          deploymentStatus: "completed",
        },
        {
          index: 1431,
          address: "EQD49cTOaLYSeBGo5VM-YKvwAk7EbfKeKMH-BbV3Bb7Enr_A",
          deploymentStatus: "pending",
        },
        {
          index: 1431,
          address: "EQD49cTOaLYSeBGo5VM-YKvwAk7EbfKeKMH-BbV3Bb7Enr_A",
          deploymentStatus: "completed",
        },
        {
          index: 1432,
          address: "EQABsHp5Eu5Kid6FKzTKjcxPe9pkwcvoeLBxmXEBz82UUY02",
          deploymentStatus: "completed",
        },
        {
          index: 1433,
          address: "EQCJ93J02WaTKacxIEqMywWioVl_T8J2Pbo3iqyasP8H1RGk",
          deploymentStatus: "completed",
        },
        {
          index: 1434,
          address: "EQATdRieYSumA_3t1BQQnP3szlxl9NrfoQ6q2GzpJyoGOC3j",
          deploymentStatus: "completed",
        },
        {
          index: 1435,
          address: "EQDSfu1NkCGc0j_woNB0V7L6GUwTFlfqlIIzPqceSfUDR_6z",
          deploymentStatus: "completed",
        },
        {
          index: 1436,
          address: "EQBmHwJXcksPqRU2TkO59jIFcjRF27eta3yaYlC53ha3Hmsb",
          deploymentStatus: "completed",
        },
        {
          index: 1437,
          address: "EQCOj5SVM_8PHZvG6py8wCunM05iONAmHGvy2ws4Nd7lk7PB",
          deploymentStatus: "completed",
        },
        {
          index: 1438,
          address: "EQD24xMbd23DAWFZKeBPThWsGoCa7Gw3QviT5CXQU7RWmQYr",
          deploymentStatus: "completed",
        },
        {
          index: 1439,
          address: "EQDFbF87iUR5qoU3I0I5TlMyIMRBWzofbWyDg41_WM9VAtVx",
          deploymentStatus: "pending",
        },
        {
          index: 1439,
          address: "EQDFbF87iUR5qoU3I0I5TlMyIMRBWzofbWyDg41_WM9VAtVx",
          deploymentStatus: "completed",
        },
        {
          index: 1440,
          address: "EQCNGmi_ceG3nwtRrMBC8EYHlKkq0OUIzLPn6PfO5LcWFLGc",
          deploymentStatus: "completed",
        },
        {
          index: 1441,
          address: "EQByDgqd2GjgvCSumwjW-2vCxtf7l7nFHDO1RvDw21-VaUXc",
          deploymentStatus: "completed",
        },
        {
          index: 1442,
          address: "EQBEHTRVWf1_c8DtonKpTcGeTI9ub_pRzBzmfSqWadNbdyKl",
          deploymentStatus: "completed",
        },
        {
          index: 1443,
          address: "EQBOmcFsHLCQom0DNZFeoMO_n0KM8mzw3ftJnuOb5GuZ4ky2",
          deploymentStatus: "completed",
        },
        {
          index: 1444,
          address: "EQAxgkBoSXT1ZyA_b2ArfDpEdv-uLpDo4wC64LvBjzA6Su2k",
          deploymentStatus: "completed",
        },
        {
          index: 1445,
          address: "EQAYKcdabdKLOUL6dWHDDyEJ0zflqnoPfpbqkizrxL612B0Y",
          deploymentStatus: "completed",
        },
        {
          index: 1446,
          address: "EQD-ZNLKVTIXB1vi1o6_pkl7GtyBxi9YLqmTmKUn-Io0d9lK",
          deploymentStatus: "completed",
        },
        {
          index: 1447,
          address: "EQAFfZFjJa5bqdIxzveiLl8MmNEXg51eGQuE0V2gUVnGfp6d",
          deploymentStatus: "completed",
        },
        {
          index: 1448,
          address: "EQBWmveU-jB6-hO1KBCMturW4XfWST7xtIV69tNzIOHX91IV",
          deploymentStatus: "pending",
        },
        {
          index: 1448,
          address: "EQBWmveU-jB6-hO1KBCMturW4XfWST7xtIV69tNzIOHX91IV",
          deploymentStatus: "pending",
        },
        {
          index: 1448,
          address: "EQBWmveU-jB6-hO1KBCMturW4XfWST7xtIV69tNzIOHX91IV",
          deploymentStatus: "completed",
        },
        {
          index: 1449,
          address: "EQB7iV-Cl7ArGThHOBOHgUGElgKyZ2me192-KVkV73LJSJTb",
          deploymentStatus: "completed",
        },
        {
          index: 1450,
          address: "EQDnxF4vzXfSeN53k92OOUEw8CRjpBQTXuh0EN4imflW2xS0",
          deploymentStatus: "completed",
        },
        {
          index: 1451,
          address: "EQAfk3N8q-E-Mj8BsbyyFcAULeONn0bEp8T1qS9H2rjaET8-",
          deploymentStatus: "completed",
        },
        {
          index: 1452,
          address: "EQA2itVYa8qjb0Ge-_Gmo7wPbrIaADzTWNmkcervrAoGNMNF",
          deploymentStatus: "completed",
        },
        {
          index: 1453,
          address: "EQBrVNanIXXhOk37K-8OvaQo56S9QHk256kjoNWr14CKzXpb",
          deploymentStatus: "completed",
        },
        {
          index: 1454,
          address: "EQCCINcelvERVhU5UcyUWz-DITpQpn-Ys2RzXQ5adHvHj_VH",
          deploymentStatus: "completed",
        },
        {
          index: 1455,
          address: "EQBpBRcRzfFTiDaAmp5X3VH9K2FMYDZjVQeaB9WiUULf_PXE",
          deploymentStatus: "completed",
        },
        {
          index: 1456,
          address: "EQA7-LpND5nF5J7ZKM_U-T7XA6WmAlIcgAYaDk1EZIVALi3Q",
          deploymentStatus: "pending",
        },
        {
          index: 1456,
          address: "EQA7-LpND5nF5J7ZKM_U-T7XA6WmAlIcgAYaDk1EZIVALi3Q",
          deploymentStatus: "completed",
        },
        {
          index: 1457,
          address: "EQBoGVuEyV9hXY7pZTiGo5e4IMupGSz4A4Paar7b_Y36ze5m",
          deploymentStatus: "completed",
        },
        {
          index: 1458,
          address: "EQDskaRd6LQeW0U1N4VcZIOPBa_CBqDwHJcUusII3bxJY8T2",
          deploymentStatus: "completed",
        },
        {
          index: 1459,
          address: "EQD9461bvFFK9HMFKZl4AeVU5XYt3Icx6L_L6Le1zQ2zRGXj",
          deploymentStatus: "completed",
        },
        {
          index: 1460,
          address: "EQCuOB4ZHkL9H9_mmZo-SNEQg2qzTLnkeZ2c38n7DEuUwh-C",
          deploymentStatus: "completed",
        },
        {
          index: 1461,
          address: "EQAop5xQtF9pybbExfNkvFxtdHAfnoTZNQ1fDmaGOyG3-zGq",
          deploymentStatus: "completed",
        },
        {
          index: 1462,
          address: "EQBLsBJUN9ktpXoZUAUBguOXM3bXxA391yBPe6Tk-bKWCFqR",
          deploymentStatus: "completed",
        },
        {
          index: 1463,
          address: "EQA4RTm0JgZglmpzEvf-o6Vrf7hywndhGOCxxqYn3sDU7DKJ",
          deploymentStatus: "completed",
        },
        {
          index: 1464,
          address: "EQAlEEtxVgiIIXHI9Ji7cBM7ZthE95E9D76-CI1jUMvzTKQi",
          deploymentStatus: "pending",
        },
        {
          index: 1464,
          address: "EQAlEEtxVgiIIXHI9Ji7cBM7ZthE95E9D76-CI1jUMvzTKQi",
          deploymentStatus: "completed",
        },
        {
          index: 1465,
          address: "EQA7irMgVjWtq8APCg0BxQhcMVqefa7D16dp27ZP7vGmUKFe",
          deploymentStatus: "completed",
        },
        {
          index: 1466,
          address: "EQCaloIpISy6PQaxXVxzphm37GNf8syJA-ee5Jdu1E4ozvVc",
          deploymentStatus: "completed",
        },
        {
          index: 1467,
          address: "EQC6G1RhFYYuNBazqsdNSVUTn9e_omEG2XPHuFHh8SVSwAUB",
          deploymentStatus: "completed",
        },
        {
          index: 1468,
          address: "EQAIywXNZbil9EfwduhrdciCivpKXc4AOcPxuayhqfc3lN6y",
          deploymentStatus: "completed",
        },
        {
          index: 1469,
          address: "EQDXuQl8ah1gJc49YFBMc0GHlp9l208Hrxntb7hDsHzA0AI0",
          deploymentStatus: "completed",
        },
        {
          index: 1470,
          address: "EQAb4Kzwviy_qtNFhYckP6GY2Eo7txr5mkh_RtCFjKe9p5Xo",
          deploymentStatus: "completed",
        },
        {
          index: 1471,
          address: "EQCT3nNF2AY4M0qspCmGikitmHvZdtbN_BRQUNm0KAI2jFDN",
          deploymentStatus: "completed",
        },
        {
          index: 1472,
          address: "EQAcemlhCDHncV_Lp695IOHWPMfdj1QUrueSnTQaM2XwSdkX",
          deploymentStatus: "completed",
        },
        {
          index: 1473,
          address: "EQDVG3VNXsvgT0tCzqrZyLxe5_8yWboIPd7uHclRGXJr0zTt",
          deploymentStatus: "pending",
        },
        {
          index: 1473,
          address: "EQDVG3VNXsvgT0tCzqrZyLxe5_8yWboIPd7uHclRGXJr0zTt",
          deploymentStatus: "completed",
        },
        {
          index: 1474,
          address: "EQAkb2gaODctVEzTV3D8H4rLpU-y9XQIIVhgzgucR5fOx38a",
          deploymentStatus: "completed",
        },
        {
          index: 1475,
          address: "EQCeXiysIXSVXKOUPimC_iU588luC7K5u8QXQTpvzQeK6nHU",
          deploymentStatus: "completed",
        },
        {
          index: 1476,
          address: "EQARdukE1wPkGKyuqSEdGVsTCnwdXz_LV7KjQL7pi5f_ouFs",
          deploymentStatus: "completed",
        },
        {
          index: 1477,
          address: "EQDqBLziECrxCu7oLf_U9CfAssrsbyaBcfMJOf1pcdwUOxu-",
          deploymentStatus: "completed",
        },
        {
          index: 1478,
          address: "EQDJ49tceMWLVlCd4bF9RwKbyAtuIRZM2lHVkp5O7qQcPZqK",
          deploymentStatus: "completed",
        },
        {
          index: 1479,
          address: "EQCE5QrgzSVDB-2PjDmdYrVMtIg9CSWNcSIQxC018OVBSVeF",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "23.json",
      supply: 50,
      currentSupplyIndex: 50,
      copies: [
        {
          index: 1480,
          address: "EQAdJ-hQRVLu4gXYcPLKkdWdIJf8EMEYeTb87S4yGVHzzux2",
          deploymentStatus: "completed",
        },
        {
          index: 1481,
          address: "EQBjBZMNSK-wyS04pGCGoWavgISJA5j2cFaBHSRQpsLM3ZT5",
          deploymentStatus: "pending",
        },
        {
          index: 1481,
          address: "EQBjBZMNSK-wyS04pGCGoWavgISJA5j2cFaBHSRQpsLM3ZT5",
          deploymentStatus: "completed",
        },
        {
          index: 1482,
          address: "EQBq6YNeT2HW4t-TUBgPQEi8jtlAF6DqDipxqrswVMjkmON7",
          deploymentStatus: "completed",
        },
        {
          index: 1483,
          address: "EQAtJB_30RL-FPEPPSSHnvYPFuGWIv8hT_WMCY5ktjUtUWMF",
          deploymentStatus: "completed",
        },
        {
          index: 1484,
          address: "EQA1WzfwemlXUS41GKYs2ZumC5TjIMxe99TsXylI4Gr1Ts0G",
          deploymentStatus: "completed",
        },
        {
          index: 1485,
          address: "EQCg5MZA8WlTTmfoiGbO3byBnnliKAbvGH1JslEZBvW1IXno",
          deploymentStatus: "completed",
        },
        {
          index: 1486,
          address: "EQCotzHgU7q_X7H7gufQZcxmm2R8Tem01bMPDywuGMuNEU9l",
          deploymentStatus: "completed",
        },
        {
          index: 1487,
          address: "EQBknX5ec4Oqp117z-rhg8L3uBwOoEYGryW84VuVSI-dgcN1",
          deploymentStatus: "completed",
        },
        {
          index: 1488,
          address: "EQA-yIlNFsbWWQYQYIZSSkIqURqeY_o3fG1Huu_a6tX32kH0",
          deploymentStatus: "completed",
        },
        {
          index: 1489,
          address: "EQDtt01D25m3MqoIIHvsMShGHTEpdKd-bJRrDOgZJ0_au_bV",
          deploymentStatus: "pending",
        },
        {
          index: 1489,
          address: "EQDtt01D25m3MqoIIHvsMShGHTEpdKd-bJRrDOgZJ0_au_bV",
          deploymentStatus: "completed",
        },
        {
          index: 1490,
          address: "EQCeVt5b4fXz9yszInCQPx6nQsBvkDyTdMdmqlzmzfcp8CFW",
          deploymentStatus: "completed",
        },
        {
          index: 1491,
          address: "EQBb32JehKB-fLtJMuuSK0RA_xnhIFqmo0V6b8OkhmMsOBSG",
          deploymentStatus: "completed",
        },
        {
          index: 1492,
          address: "EQDLgU-SPEcAv9men-9eCSZbKsfv38HuPTahws_DF9gT7c0U",
          deploymentStatus: "completed",
        },
        {
          index: 1493,
          address: "EQAvaUR_fcGd8kE9CNsBFQmOx3u7LJzDGsH1CgmcAGYrv-U-",
          deploymentStatus: "completed",
        },
        {
          index: 1494,
          address: "EQDUZCfhfICgFiHmihUS7U580Uj6uHoZcmgRbfGSC6Yrxrcc",
          deploymentStatus: "completed",
        },
        {
          index: 1495,
          address: "EQDfbEcBPp3XqwSHnbvwMDOcOg9vhJ2bh6pbm4VocVXG6QLQ",
          deploymentStatus: "completed",
        },
        {
          index: 1496,
          address: "EQAvLOmgTwbktfwxmrCDMpvXfRx5w-bpJANpOCGGxEcp4CQc",
          deploymentStatus: "completed",
        },
        {
          index: 1497,
          address: "EQDzlR4di_eOMVDiX94KaXJYnjH8hpRjzYb4Ht4bHfHfJ5RR",
          deploymentStatus: "pending",
        },
        {
          index: 1497,
          address: "EQDzlR4di_eOMVDiX94KaXJYnjH8hpRjzYb4Ht4bHfHfJ5RR",
          deploymentStatus: "completed",
        },
        {
          index: 1498,
          address: "EQCjDAWsWyPiR8-xR0b7TRaXj7B94t0WL2RkoCcvzdko1XnN",
          deploymentStatus: "completed",
        },
        {
          index: 1499,
          address: "EQDY8PW8NztwkLYmA6XO7dVhhNa-0wBrrBq3PbLXKOgn-1yG",
          deploymentStatus: "completed",
        },
        {
          index: 1500,
          address: "EQCtkngZ6VZBNocqaOS4kOQU_EDO5EcuiqdjvECp17VzH8r0",
          deploymentStatus: "completed",
        },
        {
          index: 1501,
          address: "EQB_gADgirzrO6dB1FwqTDWjiSP58FYnJxVV-wYPUQcrQfrf",
          deploymentStatus: "completed",
        },
        {
          index: 1502,
          address: "EQBRQVu4_tdi_1izSL2ZoXjBKe0q3zsHlkC1oLT2uncHSrwI",
          deploymentStatus: "completed",
        },
        {
          index: 1503,
          address: "EQBN2TclKX5WA9xdDi7g5hSqPHdzycny92Kztnsl0P_lSrEH",
          deploymentStatus: "completed",
        },
        {
          index: 1504,
          address: "EQAbd8May_rY04bXE7CWerlZpYhdjHptLES6FY8p4HeKHpA9",
          deploymentStatus: "completed",
        },
        {
          index: 1505,
          address: "EQD7KjhEGZbGOd-51xs4uSVSc3aEcvwZBIpWLTyBr2udVmZd",
          deploymentStatus: "pending",
        },
        {
          index: 1505,
          address: "EQD7KjhEGZbGOd-51xs4uSVSc3aEcvwZBIpWLTyBr2udVmZd",
          deploymentStatus: "completed",
        },
        {
          index: 1506,
          address: "EQBIeq6BbT5BakBM-gXz6AIhS7ij30Cz8RjNVp1FDzOxVe4K",
          deploymentStatus: "completed",
        },
        {
          index: 1507,
          address: "EQCYHXIZpIZI-aYXq56DLA-JwxUOg6tEohXZNTsq4Q5dqg1_",
          deploymentStatus: "completed",
        },
        {
          index: 1508,
          address: "EQDctFj_Enm8FuxmkwUlD9XYYZDsYIWKeO3BCvCeYfdEyVXh",
          deploymentStatus: "completed",
        },
        {
          index: 1509,
          address: "EQArS004yPPW2ze-nkOpJhOoSeg7jpSbSS_fE6kZRuhis-ya",
          deploymentStatus: "completed",
        },
        {
          index: 1510,
          address: "EQB5M0txeBVE18o2kSPlq8jM7Miz055Fuk1mVQXXOJXa8E_x",
          deploymentStatus: "completed",
        },
        {
          index: 1511,
          address: "EQBsJqtb7BWmycVR8iPnM5LogToFdBo_Uj4xsJhRkN9QZRIv",
          deploymentStatus: "completed",
        },
        {
          index: 1512,
          address: "EQCwz7N2q9Qvr947L7FEGD-ByqiXRQiNmk57ULH3DDWRTdax",
          deploymentStatus: "completed",
        },
        {
          index: 1513,
          address: "EQBd20RjIBbO3D6bQqh09FVzy2sr0YG26mvB9GPJe-RUlTr1",
          deploymentStatus: "completed",
        },
        {
          index: 1514,
          address: "EQC9UVQ71oYdl1Sb3epGRg8_6rtEjbuPoK9VnbKfHojjanXz",
          deploymentStatus: "pending",
        },
        {
          index: 1514,
          address: "EQC9UVQ71oYdl1Sb3epGRg8_6rtEjbuPoK9VnbKfHojjanXz",
          deploymentStatus: "completed",
        },
        {
          index: 1515,
          address: "EQDnAycfh78Tu6X5j7mbMDvZOT3b56wMVOgsItm4A8wzPvom",
          deploymentStatus: "completed",
        },
        {
          index: 1516,
          address: "EQA-nTPj4Sh3X7dvqJXm6Rhkl8f1izfhD2w0lwEOEAHe0ewg",
          deploymentStatus: "completed",
        },
        {
          index: 1517,
          address: "EQCm4ZokL2KgpAxVj8EeHdvVBuuvucf73JxIKonm1HVibJSV",
          deploymentStatus: "completed",
        },
        {
          index: 1518,
          address: "EQDPcST71zDUSw8C5M7yu4c_ahtP3gwgXnGsHT3byIxPWp8g",
          deploymentStatus: "completed",
        },
        {
          index: 1519,
          address: "EQD3NyyxwR54UX-FiPgklNDSbaCe9eRNfwmnJvrcaUPXC5nR",
          deploymentStatus: "completed",
        },
        {
          index: 1520,
          address: "EQBdwBVRVb_EXpgAEwvpGA6PB3UyAg6ITBpUbGahXYn04xGk",
          deploymentStatus: "completed",
        },
        {
          index: 1521,
          address: "EQBkVe8U6a7ekE6ZRA_7CimnLEC-DPLqzeWAkZ5--TLtARZ8",
          deploymentStatus: "completed",
        },
        {
          index: 1522,
          address: "EQC1vLI7hRY6EMeE6mROIbS-GGpoIswL964GcEyPzqjewoCj",
          deploymentStatus: "completed",
        },
        {
          index: 1523,
          address: "EQCB5FXvpx6JMRnNf26SfblMcLxMheNSr0mav0q5WRaPSD5-",
          deploymentStatus: "pending",
        },
        {
          index: 1523,
          address: "EQCB5FXvpx6JMRnNf26SfblMcLxMheNSr0mav0q5WRaPSD5-",
          deploymentStatus: "completed",
        },
        {
          index: 1524,
          address: "EQAjRTwTo8zotGVgTCaF94KlqfxY2rXoMri62e1Vh4h_b649",
          deploymentStatus: "completed",
        },
        {
          index: 1525,
          address: "EQAMtY6Rk-hQzYQBFFjZGsEFqOFBxiZ7KyEZu7_2OFgRXDls",
          deploymentStatus: "completed",
        },
        {
          index: 1526,
          address: "EQBw-PjS38S8qJmBXzUjLMAw0kgqAEsLNbeQPAc-MlXmGwW5",
          deploymentStatus: "completed",
        },
        {
          index: 1527,
          address: "EQAuIWFQlJzssZitMbw0ekOiQmiaYUFrr1A_sosi9eBfB6gm",
          deploymentStatus: "completed",
        },
        {
          index: 1528,
          address: "EQBAlCe7P-0VdubeK8KI4zHKEiI1cZWMkiBKCMIBxx5qcup1",
          deploymentStatus: "completed",
        },
        {
          index: 1529,
          address: "EQD1ytWuyhpVyDD6MFkH11WTZTmgDDGQJdMWb52brOfMMhD3",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "24.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 1530,
          address: "EQBEZj6NwLKueeqqbZlJru604kE8FogBEARorX93i7UXvnNv",
          deploymentStatus: "completed",
        },
        {
          index: 1531,
          address: "EQATbYImjqeatfRSQxbulgM5Nyz9tgBYegvqlDgaemGwtiWX",
          deploymentStatus: "pending",
        },
        {
          index: 1531,
          address: "EQATbYImjqeatfRSQxbulgM5Nyz9tgBYegvqlDgaemGwtiWX",
          deploymentStatus: "completed",
        },
        {
          index: 1532,
          address: "EQDB4dNaeQQDbDDPTQo6ZWmJHydus4m3plp7buXbq9-us6gR",
          deploymentStatus: "completed",
        },
        {
          index: 1533,
          address: "EQC3MJXbm0j0npXeUzBc9wRE4h6Jhb6kmZn4aVr2SoGhp6IE",
          deploymentStatus: "completed",
        },
        {
          index: 1534,
          address: "EQAKpa4Db41hP3hfuRhsOmI7w-wVxtspOfYEcGuJ9fRMmRm_",
          deploymentStatus: "completed",
        },
        {
          index: 1535,
          address: "EQCei0mFj8Ka14zAf_EU6il0ULMJ1mlZ9l9CTUqzV1q3rcB-",
          deploymentStatus: "completed",
        },
        {
          index: 1536,
          address: "EQDOcfbXlO9N1tJ8KBfu4xKyIuVfx1W9LAfrQHudrfPX4YR2",
          deploymentStatus: "completed",
        },
        {
          index: 1537,
          address: "EQAiOAqBdxhmqiOdEBGT0uMQWB6gVEDba384qcfqmZVapxwd",
          deploymentStatus: "completed",
        },
        {
          index: 1538,
          address: "EQDlQEPza3UmTpbeo5Mi2VYmGiTh19ioCopFXmeBH52eJ1nB",
          deploymentStatus: "completed",
        },
        {
          index: 1539,
          address: "EQBYm1A04FxlVJm32yQcoCSfLzb0U1dAXV6BBGJwC460lGhg",
          deploymentStatus: "pending",
        },
        {
          index: 1539,
          address: "EQBYm1A04FxlVJm32yQcoCSfLzb0U1dAXV6BBGJwC460lGhg",
          deploymentStatus: "completed",
        },
        {
          index: 1540,
          address: "EQAk4z9fjnh29EbB1A2bt0-ueHdxiV6edKBsfXq9GtZiTjG_",
          deploymentStatus: "completed",
        },
        {
          index: 1541,
          address: "EQDYs2pYMBRLcYy-09W5hRwM1IF-GoA7HGZjHrci60EzsrRl",
          deploymentStatus: "completed",
        },
        {
          index: 1542,
          address: "EQD6g4hOBz297Qa2toXPQDHCxmEZ9rDEeQwN72dYlUoTg7JS",
          deploymentStatus: "completed",
        },
        {
          index: 1543,
          address: "EQA4PsXLn974o_ysubUBhxehV331XNFbjjY0mp3l6t4Eyc-z",
          deploymentStatus: "completed",
        },
        {
          index: 1544,
          address: "EQBoVEO5MWVQI7oK7b3CbuZSNaFq47R1kSa6F7B5R8aMSkhr",
          deploymentStatus: "completed",
        },
        {
          index: 1545,
          address: "EQCUwpgMVZWpfSzkTV0qcE11ZEZgthTIbyZs-FbPlAFEafx0",
          deploymentStatus: "completed",
        },
        {
          index: 1546,
          address: "EQAEl7_6GlpEqBIqM31tNubwvArxK6GGI-15XR6yVSJLIym2",
          deploymentStatus: "completed",
        },
        {
          index: 1547,
          address: "EQDiELbM8TI9HV3JNAA53IYoCOqN2Ul1pZO-JTN2R1Zd1h4i",
          deploymentStatus: "pending",
        },
        {
          index: 1547,
          address: "EQDiELbM8TI9HV3JNAA53IYoCOqN2Ul1pZO-JTN2R1Zd1h4i",
          deploymentStatus: "completed",
        },
        {
          index: 1548,
          address: "EQAUOSvtwtdVMG9FXpwfi3FgPHXow1L9iZ44G5OMIPKFXVSa",
          deploymentStatus: "completed",
        },
        {
          index: 1549,
          address: "EQBg4yhSYpvMvH5jsaQO04HXHyx9rjidyUWnUcc6NccTAX9k",
          deploymentStatus: "completed",
        },
        {
          index: 1550,
          address: "EQAnzFM85ckVVVUsuL__bEQEvXB-lvoi_Q8GN6xejrYUQsVq",
          deploymentStatus: "completed",
        },
        {
          index: 1551,
          address: "EQB0Ujk6XsecNeoFIW3hfXJFCPV9gX3waEo8c3PQnN9n8TM9",
          deploymentStatus: "completed",
        },
        {
          index: 1552,
          address: "EQBvX_WUtFWDJI0mequzJYvEoezKYDCqBavjs8EKH3RDRhxN",
          deploymentStatus: "completed",
        },
        {
          index: 1553,
          address: "EQBAmHRzZpw_mNoeQXBhYwNwHnvbwU-F-luAFDxZnk_6dk0S",
          deploymentStatus: "completed",
        },
        {
          index: 1554,
          address: "EQBW6L_bLY5YPQux3G6jTPbu9C4BuIxfS9GBOEbXxsF-q3Zz",
          deploymentStatus: "completed",
        },
        {
          index: 1555,
          address: "EQAbkbl4dYwTGMfUyNEX4zSQRuFJyg9FdqXwwMBwlnUANFcW",
          deploymentStatus: "completed",
        },
        {
          index: 1556,
          address: "EQDHJd0-2RqISnbRdJbVAKLzYTOjJUB3kCJTfoqiV21vhkU6",
          deploymentStatus: "pending",
        },
        {
          index: 1556,
          address: "EQDHJd0-2RqISnbRdJbVAKLzYTOjJUB3kCJTfoqiV21vhkU6",
          deploymentStatus: "pending",
        },
        {
          index: 1556,
          address: "EQDHJd0-2RqISnbRdJbVAKLzYTOjJUB3kCJTfoqiV21vhkU6",
          deploymentStatus: "completed",
        },
        {
          index: 1557,
          address: "EQAgSQ15Tg7181QMgyqg-gOTtIyNR4j8KN4Fsm6EqhOv87So",
          deploymentStatus: "completed",
        },
        {
          index: 1558,
          address: "EQDu6fsXiG5i9xnoBd0eNZV3xv1RPQWyeDHMWP7D9CKz019h",
          deploymentStatus: "completed",
        },
        {
          index: 1559,
          address: "EQAEvw-nh4hdG27qGM9pfl2vykR8ljKNeiBLTMD0R26BxV_i",
          deploymentStatus: "completed",
        },
        {
          index: 1560,
          address: "EQB5yffXgFDROycuQiERY8q6QuMuibQZWs8htGqr75dtc_-F",
          deploymentStatus: "completed",
        },
        {
          index: 1561,
          address: "EQC7FWkSNmmxsNzqiPpzooRzJB_8O3vG2BTz_MLufRare71Z",
          deploymentStatus: "completed",
        },
        {
          index: 1562,
          address: "EQDL9C6hc1sjG0yjT8S96B7T6-O5LHVq4LeDt2PhLG7yU9mv",
          deploymentStatus: "completed",
        },
        {
          index: 1563,
          address: "EQD89Ym6Sb-yLYZtLcGfDOizo42jIoGHONFuqnGQQYm3uoM9",
          deploymentStatus: "completed",
        },
        {
          index: 1564,
          address: "EQC6tpPobHgiGv9afwbFmK0iTlh_7zv5oEeyv9dJw_VFfjZM",
          deploymentStatus: "completed",
        },
        {
          index: 1565,
          address: "EQBkQl9P7uYrJpWtfwpraMZ1ul2HX76kwDqIOxGl5dnv1Gc4",
          deploymentStatus: "pending",
        },
        {
          index: 1565,
          address: "EQBkQl9P7uYrJpWtfwpraMZ1ul2HX76kwDqIOxGl5dnv1Gc4",
          deploymentStatus: "pending",
        },
        {
          index: 1565,
          address: "EQBkQl9P7uYrJpWtfwpraMZ1ul2HX76kwDqIOxGl5dnv1Gc4",
          deploymentStatus: "completed",
        },
        {
          index: 1566,
          address: "EQBIB1F1wwOOtk5XQQ8jpq_gl29V3gE0BLkdi9LreCsGKvBo",
          deploymentStatus: "completed",
        },
        {
          index: 1567,
          address: "EQDyO5dA6JHEqzcySVWKOoPn4NmPD3xSJpAPytbDrhrluyvt",
          deploymentStatus: "completed",
        },
        {
          index: 1568,
          address: "EQAAEOm29JSJRyktYQ45YgJoyjK9lpcE2jMeoMf_lltZQzby",
          deploymentStatus: "completed",
        },
        {
          index: 1569,
          address: "EQCdlkyvKwa51BiEpRkH9RjvvF1Li5gSiROnnMQdqrmDuyV7",
          deploymentStatus: "completed",
        },
        {
          index: 1570,
          address: "EQBfcHzBh11BPKvAFafY3iwLxtC5snBmZSG5_hPmW5-ZMIwk",
          deploymentStatus: "completed",
        },
        {
          index: 1571,
          address: "EQCdqF5Ghq_AxSSbaodYMIpacg8FNbQHXq9stle9kuPEdiES",
          deploymentStatus: "completed",
        },
        {
          index: 1572,
          address: "EQABc5r9AJq_byUXtabfWcD4i-ZY49frCIActCdCKSsP13dG",
          deploymentStatus: "completed",
        },
        {
          index: 1573,
          address: "EQD0aKPMUVbZFKphSTb_aWe1xO1SCUqrD2CePk6jC3XklTjT",
          deploymentStatus: "pending",
        },
        {
          index: 1573,
          address: "EQD0aKPMUVbZFKphSTb_aWe1xO1SCUqrD2CePk6jC3XklTjT",
          deploymentStatus: "completed",
        },
        {
          index: 1574,
          address: "EQBeHUHQ9oVYD-62uo1sTx2bm264xY-WTmdrok-jhCWsKy8y",
          deploymentStatus: "completed",
        },
        {
          index: 1575,
          address: "EQDRYuLcnx9zI5h-N74zr8NEB_-_EAEwV1YGqm9-j4HQUDib",
          deploymentStatus: "completed",
        },
        {
          index: 1576,
          address: "EQBh6VcrqndJ-cXHuh7_yGjfcmSSyoNSjLIVRIyAK5Z4m4Nz",
          deploymentStatus: "completed",
        },
        {
          index: 1577,
          address: "EQBkZUWmgo8edHm0ce9i7HR2LXdF9TctjyvGKBqeVVQXabh9",
          deploymentStatus: "completed",
        },
        {
          index: 1578,
          address: "EQDcvnedvmgPq8Lixlupjddu5Nwj9O2sSVvuWsUzzvwWKw1z",
          deploymentStatus: "completed",
        },
        {
          index: 1579,
          address: "EQBRvh1BtVojmKhyaN1jGnO-6JLaIhdCoaC6eYAyWhuujt_j",
          deploymentStatus: "completed",
        },
        {
          index: 1580,
          address: "EQAlbBH0dvNXNauQUCIWvzA7LZSYGmSc6sqH1d2gNfvDjQ6E",
          deploymentStatus: "completed",
        },
        {
          index: 1581,
          address: "EQDaJsnsE_mCI6Vjjb1gJPRjFAk_lb3tJHvkIpInMk7y_UYm",
          deploymentStatus: "pending",
        },
        {
          index: 1581,
          address: "EQDaJsnsE_mCI6Vjjb1gJPRjFAk_lb3tJHvkIpInMk7y_UYm",
          deploymentStatus: "completed",
        },
        {
          index: 1582,
          address: "EQBphPDZyJnEnfFeFJNZGoaZJL93iUgsaWOCdvo5bF_i2NMN",
          deploymentStatus: "completed",
        },
        {
          index: 1583,
          address: "EQDvhH9GYRG39FydqM6WJYQ0PZGnHX1Ql1KP0xp7T_vCIbaH",
          deploymentStatus: "completed",
        },
        {
          index: 1584,
          address: "EQAcafOc52BM3-B0ZOGjXQGFcvpGYSRBrRdRTWUrvSIwPJhR",
          deploymentStatus: "completed",
        },
        {
          index: 1585,
          address: "EQAUu1KRIzo2uHnhD2Mt8Kc2x7pDMfQ3qvviUBoRvK0rEZWS",
          deploymentStatus: "completed",
        },
        {
          index: 1586,
          address: "EQDvD4A5bXDjKffMnMj5_A6iK5tqRTw82nrliQExJ8pCpmOZ",
          deploymentStatus: "completed",
        },
        {
          index: 1587,
          address: "EQCTpEZPVLHERZRJJ1x0TsQD31ZgQKiGODmVlxZmkOKaLx_n",
          deploymentStatus: "completed",
        },
        {
          index: 1588,
          address: "EQBgyvZ7dc7727DekA2qU929WCIqwIPRzB3oYWxiLm6ekicH",
          deploymentStatus: "completed",
        },
        {
          index: 1589,
          address: "EQCbOL9NspSEKFjzSLpuoXbSDbR4KdD5eHl1EEa7U8ck1i7b",
          deploymentStatus: "completed",
        },
        {
          index: 1590,
          address: "EQC5RuhG773o0lrFeq1ue6k1QtipQBTlgHKMaQntK7b9BhAb",
          deploymentStatus: "pending",
        },
        {
          index: 1590,
          address: "EQC5RuhG773o0lrFeq1ue6k1QtipQBTlgHKMaQntK7b9BhAb",
          deploymentStatus: "pending",
        },
        {
          index: 1590,
          address: "EQC5RuhG773o0lrFeq1ue6k1QtipQBTlgHKMaQntK7b9BhAb",
          deploymentStatus: "completed",
        },
        {
          index: 1591,
          address: "EQDvzZPkr-oGNd7PCokKST50D_U5qtOyvmPSdeqpjcz7FWtB",
          deploymentStatus: "completed",
        },
        {
          index: 1592,
          address: "EQCrUtdNTkMXVLAbwmmwWgp5eQbGkRIwJvBlZd8jQDNwqBvw",
          deploymentStatus: "completed",
        },
        {
          index: 1593,
          address: "EQBfyZN8Bgl5oJOMLU1BZZJitifr2UGwjaOr-jx-Dj7fcY4i",
          deploymentStatus: "completed",
        },
        {
          index: 1594,
          address: "EQDgUQpK202pefe5wGGaNubjWuQLZEvQ5TlBlyrY7yxAkPo1",
          deploymentStatus: "completed",
        },
        {
          index: 1595,
          address: "EQAe3U6tbjqkkejZseIQeG39R3INUzlHYSv8Aj8Hcfw7bM-i",
          deploymentStatus: "completed",
        },
        {
          index: 1596,
          address: "EQCVZUKV475aXevsSGnuEe_OkJgy6JRdwKN0ehYInWy0oT6Y",
          deploymentStatus: "completed",
        },
        {
          index: 1597,
          address: "EQC0i_MOYNaMLfFn2gfoK9gZIrAqUFI6_83xJDvVXJSg8Vnc",
          deploymentStatus: "completed",
        },
        {
          index: 1598,
          address: "EQAgvpnXfNH1fnnLYrVCme9Wv7zA7TBR74uuM-Iduezh7PiV",
          deploymentStatus: "completed",
        },
        {
          index: 1599,
          address: "EQB6LQTJYglzwIXNE02D4o-rpKdWrVsJ2GjaygNnI_gnbTuD",
          deploymentStatus: "completed",
        },
        {
          index: 1600,
          address: "EQBxoIdJv4mmFgt_oV4CEmm_5--0PrmcWgc2rCrml3ROGMcY",
          deploymentStatus: "pending",
        },
        {
          index: 1600,
          address: "EQBxoIdJv4mmFgt_oV4CEmm_5--0PrmcWgc2rCrml3ROGMcY",
          deploymentStatus: "completed",
        },
        {
          index: 1601,
          address: "EQA1-BuWW4WTI9ixWX7kQLdaynHN-3F_bu74moBkPfTtCTCv",
          deploymentStatus: "completed",
        },
        {
          index: 1602,
          address: "EQC-4bUzHNHU1R0V2xrjbMbQBR6QFJfxYPpU1c05ShNSaBm6",
          deploymentStatus: "completed",
        },
        {
          index: 1603,
          address: "EQAm6JNS0JMQ9U4gPk-1xiv66TW3IP3hH-oaOiqSUyqwV4Hv",
          deploymentStatus: "completed",
        },
        {
          index: 1604,
          address: "EQCpDvOvWde7uyD95hlYPdOHKJN4zTfeTKBPTQ6jGghhjfH7",
          deploymentStatus: "completed",
        },
        {
          index: 1605,
          address: "EQCyvZv-KKxBxCE-_u03v0hD_riY5cES84PEMH-ZDc9G2fc-",
          deploymentStatus: "completed",
        },
        {
          index: 1606,
          address: "EQBR_v6h72VcWMXS6FSJzOmFg_3FKgB3I_c_eDoZwdXrtTTe",
          deploymentStatus: "pending",
        },
        {
          index: 1606,
          address: "EQBR_v6h72VcWMXS6FSJzOmFg_3FKgB3I_c_eDoZwdXrtTTe",
          deploymentStatus: "completed",
        },
        {
          index: 1607,
          address: "EQAbz2pdR8Nb6zbacAx-93NKQi6VPlY2XcNpx6-Ygm7blemd",
          deploymentStatus: "completed",
        },
        {
          index: 1608,
          address: "EQAerVbF1kmZV97s6D26xW_30gx-qve5hDzt9I8XCzuDbJ8m",
          deploymentStatus: "completed",
        },
        {
          index: 1609,
          address: "EQDaHnpBUUfORppgr1jO-Kd9_9MTYglYgTxQRtaMwsWnUdo6",
          deploymentStatus: "completed",
        },
        {
          index: 1610,
          address: "EQCXBu8Uq4ZqbKIHYP8Rh3QFcpYploF6CNuS9K5n3AL7UVDQ",
          deploymentStatus: "completed",
        },
        {
          index: 1611,
          address: "EQDMENmGV_Ovz2XY821gQK5WkLEej7tQ_P8Bd3vz-84Zxn_q",
          deploymentStatus: "completed",
        },
        {
          index: 1612,
          address: "EQBY62cewfFZbLKBFwlEsxo_UkY3FlC8NatD7Ko67X22Zic-",
          deploymentStatus: "completed",
        },
        {
          index: 1613,
          address: "EQDtLD6SZkiLWT_K4lzyLpN7x-uYKBviGDbyfdpngRe7ohpX",
          deploymentStatus: "completed",
        },
        {
          index: 1614,
          address: "EQB27jcQLxEcj53CPqSvyzntjiUTGGfMl9_SMYB3E1MPwdOJ",
          deploymentStatus: "pending",
        },
        {
          index: 1614,
          address: "EQB27jcQLxEcj53CPqSvyzntjiUTGGfMl9_SMYB3E1MPwdOJ",
          deploymentStatus: "completed",
        },
        {
          index: 1615,
          address: "EQCOlmTOBno7zfHJ5eeH75eVch1hCT52m4g7hvdtlbZFTcCd",
          deploymentStatus: "completed",
        },
        {
          index: 1616,
          address: "EQArUiPQr9NyCMPGDpb0xCj7DAELxermcrcZIkOWXNq_gXO9",
          deploymentStatus: "completed",
        },
        {
          index: 1617,
          address: "EQA8j17YsW20jLvSDe5l4zvQ6nkkKXrSyEB254lZGuh1CV2G",
          deploymentStatus: "completed",
        },
        {
          index: 1618,
          address: "EQChmvckZwa8FpBgzd9yD2-coHSv3CGUAdR2lzMtpIR9FGbN",
          deploymentStatus: "completed",
        },
        {
          index: 1619,
          address: "EQDw4bHaR9YJ6PiSK3k1dn7EmPvzxrynfUovA4GOpwZWT_Ib",
          deploymentStatus: "completed",
        },
        {
          index: 1620,
          address: "EQDmq7XT3yz3kVjO3O9WvIH-loAm3FL-wiI-KhQCQVseYyNU",
          deploymentStatus: "completed",
        },
        {
          index: 1621,
          address: "EQBJReXLMBxNc97RAgXRPI2iCwmbPHdNYoCP7a2ez8i51IkK",
          deploymentStatus: "completed",
        },
        {
          index: 1622,
          address: "EQCdziazQb8TmB53oUzbOENRD1LZygxvSkGMN5Mlm8j4yY1P",
          deploymentStatus: "completed",
        },
        {
          index: 1623,
          address: "EQA-bFLSbPPkd7E7aXMeSck_A9EgS4e3vu7xR-MKVreF_J5g",
          deploymentStatus: "pending",
        },
        {
          index: 1623,
          address: "EQA-bFLSbPPkd7E7aXMeSck_A9EgS4e3vu7xR-MKVreF_J5g",
          deploymentStatus: "completed",
        },
        {
          index: 1624,
          address: "EQAECfjH6ir39lpe5YLFHy05dVggI3yp6T5AKA0uGWKpt2uG",
          deploymentStatus: "completed",
        },
        {
          index: 1625,
          address: "EQAx_iwr87WvpARZibhTjjpmHF8OEJ4Ie25npRaVu-lmOOAo",
          deploymentStatus: "completed",
        },
        {
          index: 1626,
          address: "EQBpEDLiq-3OuudjArluW8c-wUFx-Y5j3E_HpjQ4rQd_Vgz5",
          deploymentStatus: "completed",
        },
        {
          index: 1627,
          address: "EQB9XAO3U7K2jrv_DY6PKgCpgTGdO6_UHVYW_mPuI26Igyt3",
          deploymentStatus: "pending",
        },
        {
          index: 1627,
          address: "EQB9XAO3U7K2jrv_DY6PKgCpgTGdO6_UHVYW_mPuI26Igyt3",
          deploymentStatus: "completed",
        },
        {
          index: 1628,
          address: "EQAh48coi1BFPsW9Q64yAnpUArufb5d3A5P8mZkZe-JwSnSh",
          deploymentStatus: "completed",
        },
        {
          index: 1629,
          address: "EQA43KQdervJK3BY5yU_bAz4Q2Pkbtq1Y2k_Mmo0W4v1hjUd",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "25.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 1630,
          address: "EQCcgPqEa2qqE9R3lzLUApLqp3uK5AZZD2sujg2UGcqLAIUW",
          deploymentStatus: "completed",
        },
        {
          index: 1631,
          address: "EQC79CcbeI1MqAcBhBO8qSkt9uU_k_Rkwufvygs2Ylajdo-Y",
          deploymentStatus: "completed",
        },
        {
          index: 1632,
          address: "EQBgMsukDrjEF9D0CbhXXqgdm0TPENxKxhYLMHvJlxdJZ6fd",
          deploymentStatus: "pending",
        },
        {
          index: 1632,
          address: "EQBgMsukDrjEF9D0CbhXXqgdm0TPENxKxhYLMHvJlxdJZ6fd",
          deploymentStatus: "completed",
        },
        {
          index: 1633,
          address: "EQDoB31yM7cy7H8gd1ryCkjNtzJboAwuuS4aAuUAz870TyZ6",
          deploymentStatus: "completed",
        },
        {
          index: 1634,
          address: "EQA5RGBpUuGvQ5lDdtDhKcvMatNWazkV1alIaKIyhcytT4V7",
          deploymentStatus: "completed",
        },
        {
          index: 1635,
          address: "EQAohKOEV1sXUajKODySY67QV_grIF6DYe4QIM94EFpev2AT",
          deploymentStatus: "completed",
        },
        {
          index: 1636,
          address: "EQAtYprYIG3IlvlZ2ATlMtxKChwJnQ1Jzzonx7C91TfDfmtT",
          deploymentStatus: "completed",
        },
        {
          index: 1637,
          address: "EQBd33FFP2ROQAu9qrQ8deLdZFGaAMHQ12Wtgx2T0A0LJsdT",
          deploymentStatus: "completed",
        },
        {
          index: 1638,
          address: "EQBlum8jyOwFdtvHZwD8Z6e5Bz2fnn0NQlheKetkoJ_fxHYL",
          deploymentStatus: "completed",
        },
        {
          index: 1639,
          address: "EQBjtpT37baT4DmOU66IV44k3LElslgmHp0xhEOmJaloep1p",
          deploymentStatus: "completed",
        },
        {
          index: 1640,
          address: "EQBxVunKUoT27psYE0GOABKE7BnrE8TKDtFtaDslPdI0wwQ8",
          deploymentStatus: "pending",
        },
        {
          index: 1640,
          address: "EQBxVunKUoT27psYE0GOABKE7BnrE8TKDtFtaDslPdI0wwQ8",
          deploymentStatus: "completed",
        },
        {
          index: 1641,
          address: "EQBo6AZCF9SMsQLRsXyXD5FJSou3Zn4GLdqiIIOu9hiNJbHG",
          deploymentStatus: "completed",
        },
        {
          index: 1642,
          address: "EQA65GE2p7A8dqchMA0fRutfwLp9ZjGphUM35a6IGEWbb5MC",
          deploymentStatus: "completed",
        },
        {
          index: 1643,
          address: "EQAMv_cTGC8vBx1T3MZ6P9BH4DX_gljaAXIx5puBlllh5PCD",
          deploymentStatus: "completed",
        },
        {
          index: 1644,
          address: "EQAO9TyEv6t002T5d_-ssWwwn5We_RF9AhaRUZ17ajybFPyu",
          deploymentStatus: "completed",
        },
        {
          index: 1645,
          address: "EQDbf88IhI93Z5AkunqIO4JqT7V22L5-sTgaSOjsifeYrHuI",
          deploymentStatus: "completed",
        },
        {
          index: 1646,
          address: "EQCQyLejDlPOcADPjdJd_BEsOrjXqLLIm6mnuu0E-I-FX_lA",
          deploymentStatus: "completed",
        },
        {
          index: 1647,
          address: "EQCJ1m_UW-ntQqUqMgMIG5NWSWW7bAsOscy35azSGGgxwTZy",
          deploymentStatus: "completed",
        },
        {
          index: 1648,
          address: "EQD9seQiIE0rco18CFzTq-doMlpJJlIe-hvgrp6e1CDGMh6_",
          deploymentStatus: "completed",
        },
        {
          index: 1649,
          address: "EQCbbwHJ76aN3V8R3SIMNJlcU3ucntIWM3uLXNDd0rZzliee",
          deploymentStatus: "pending",
        },
        {
          index: 1649,
          address: "EQCbbwHJ76aN3V8R3SIMNJlcU3ucntIWM3uLXNDd0rZzliee",
          deploymentStatus: "completed",
        },
        {
          index: 1650,
          address: "EQDHpXzcJWHqdAkC3PwGVDBTpDyILT2uS5ZPH7U48LiFFcRR",
          deploymentStatus: "completed",
        },
        {
          index: 1651,
          address: "EQC4Mi6Mr6H0sJiatxakO-ARlw3bg6D0y_KZxK4QPcJVWI1q",
          deploymentStatus: "completed",
        },
        {
          index: 1652,
          address: "EQBdhJQ3oPMAhgG5gydqoXsafphxDFQtpaxWsfGTO49dvRJM",
          deploymentStatus: "completed",
        },
        {
          index: 1653,
          address: "EQC7Hct0NcIHaxQtbcKARBy_ueSkv-uv3dkujvK6suKeFK_6",
          deploymentStatus: "completed",
        },
        {
          index: 1654,
          address: "EQCIfqPyl0vOgdgalFp3KT5RfZ4K0tseP_HadrMI3Jq99uCL",
          deploymentStatus: "completed",
        },
        {
          index: 1655,
          address: "EQCN6cz8872fLouur-_8cFImFWoEMAuIaLH413gjqGxxhvAw",
          deploymentStatus: "completed",
        },
        {
          index: 1656,
          address: "EQCq8nf7HV-4AKaaPODHss1digXINc0X6XB4n8cxdqvo1QWl",
          deploymentStatus: "completed",
        },
        {
          index: 1657,
          address: "EQATDx6Uc97Tl3zDEUwOzte0oTi14wvUWP5v6TDGfsnPcErL",
          deploymentStatus: "completed",
        },
        {
          index: 1658,
          address: "EQAPtOplsQd4i5alDoDw15yDeX4kOy3k6iIHP_kXn-tgm3rH",
          deploymentStatus: "completed",
        },
        {
          index: 1659,
          address: "EQA92-npvwhnYV9PlkwjHToHdqtV9r7oNBsdHfyMoCozFAvW",
          deploymentStatus: "pending",
        },
        {
          index: 1659,
          address: "EQA92-npvwhnYV9PlkwjHToHdqtV9r7oNBsdHfyMoCozFAvW",
          deploymentStatus: "completed",
        },
        {
          index: 1660,
          address: "EQDnmN2aWKtNNCgtsKM4ffQiDZLFYGwPLoUVB-1gLZ0Q1UGS",
          deploymentStatus: "completed",
        },
        {
          index: 1661,
          address: "EQCggNmGqm-ITaFbdJhfcnZ6oDO0v9kq-djH4NgPo8ah67UB",
          deploymentStatus: "completed",
        },
        {
          index: 1662,
          address: "EQD9ifoX4nnJvZfMeRQfDjZVC9fsPY6v_qXXc5Y9uUUmYgYx",
          deploymentStatus: "completed",
        },
        {
          index: 1663,
          address: "EQAcOK9sO7itj5vIgu_y11mhPmNBUtadde68ftT7zKgl7r7p",
          deploymentStatus: "completed",
        },
        {
          index: 1664,
          address: "EQAp25Tcvjaovr7Sj8JUzpWiZFQfYdLZJ3wOwFK9bO4CCKeE",
          deploymentStatus: "completed",
        },
        {
          index: 1665,
          address: "EQAaLqE9NlPyGTMfWwB2YeBges2HYBM84HLxyongtTm6Zkui",
          deploymentStatus: "completed",
        },
        {
          index: 1666,
          address: "EQDcQjox-IK7KdpgodvVAwFD4LHQsDnjHcPcdcgtjo2zq20q",
          deploymentStatus: "completed",
        },
        {
          index: 1667,
          address: "EQBandnXdk5GsNG5N16FtHrRyFMHi93x7M_QzckSO22Ee7Fp",
          deploymentStatus: "completed",
        },
        {
          index: 1668,
          address: "EQBfjRynuDmQ13z1tUs7ZWuf1qABBSB3Nr-_NTOMsTycZ_np",
          deploymentStatus: "pending",
        },
        {
          index: 1668,
          address: "EQBfjRynuDmQ13z1tUs7ZWuf1qABBSB3Nr-_NTOMsTycZ_np",
          deploymentStatus: "completed",
        },
        {
          index: 1669,
          address: "EQAb0JWgzj9m2yUXesBCyIHOeoLga0EJTW9VMvURNBMv0q8p",
          deploymentStatus: "completed",
        },
        {
          index: 1670,
          address: "EQAxvWGVMmErcwu9C67Bewj1VpuoS3Qt1hy6vBTfsxlICVqd",
          deploymentStatus: "completed",
        },
        {
          index: 1671,
          address: "EQDJFT9IrUqX9jCfS3ZlXvJf1C6NL3gEDtiHWJ84i5xLcgP2",
          deploymentStatus: "completed",
        },
        {
          index: 1672,
          address: "EQAvl7Mjazqf0EVmBevjjFcZ6qEkwVE_dG1MnYLZsmr0G7s1",
          deploymentStatus: "completed",
        },
        {
          index: 1673,
          address: "EQAeK7I17xPMDhaQXRQqbXfcNIKREvm82Hsy5TnO2yd4wIqk",
          deploymentStatus: "completed",
        },
        {
          index: 1674,
          address: "EQBBy--RLVxCFSfWlGTT8ZNm3obfW9FbSupnZOAtMvZWZ3qw",
          deploymentStatus: "completed",
        },
        {
          index: 1675,
          address: "EQCDz8IYHHoMcJzmDoldzEE6IE9q8fSn9byiCb7-OqRaOLCC",
          deploymentStatus: "completed",
        },
        {
          index: 1676,
          address: "EQCXfx9Vytk18GDVpIvluhfN5EdD0T4qZFFqxHe8IzC3UKA3",
          deploymentStatus: "pending",
        },
        {
          index: 1676,
          address: "EQCXfx9Vytk18GDVpIvluhfN5EdD0T4qZFFqxHe8IzC3UKA3",
          deploymentStatus: "completed",
        },
        {
          index: 1677,
          address: "EQBtuIG6f7E1AuHYjRhO9TJFZKIAbRqesIUj9dSipADt9DPy",
          deploymentStatus: "completed",
        },
        {
          index: 1678,
          address: "EQCdjUZQisY7YCc3WvupyVo7tkwmxY7pepu5d_mIUYdB7SHc",
          deploymentStatus: "completed",
        },
        {
          index: 1679,
          address: "EQBF2iWOotoEG5ex8Yz1nrDWAXe-FrHalUbyU3oSL1zPukat",
          deploymentStatus: "completed",
        },
        {
          index: 1680,
          address: "EQBxmJBBrd6dJNyMgi9i0dXfFHuojfkdbeUoMsdZCGCAWTSF",
          deploymentStatus: "completed",
        },
        {
          index: 1681,
          address: "EQDI-CgAkLCu4IvgjRfL6oCozAV1U56hm5Ql0DV8PzQdjhaV",
          deploymentStatus: "completed",
        },
        {
          index: 1682,
          address: "EQA35XEBOyD4GkBefZ9iDgApMjt71_mc8NjyDe42UvWxssvG",
          deploymentStatus: "completed",
        },
        {
          index: 1683,
          address: "EQDpsgMfoHVE05q0J12oieYo873QjktYJ9xd3QdNRPT7P1J0",
          deploymentStatus: "completed",
        },
        {
          index: 1684,
          address: "EQDZLXWyvluAdArVeaHOPy2gADpA2rrZmEsE13KV0eg18xb-",
          deploymentStatus: "completed",
        },
        {
          index: 1685,
          address: "EQDaHZ2u-waRz54IM5ujCZ35WnjkrElOKGFKtW5BSkOmtnQC",
          deploymentStatus: "pending",
        },
        {
          index: 1685,
          address: "EQDaHZ2u-waRz54IM5ujCZ35WnjkrElOKGFKtW5BSkOmtnQC",
          deploymentStatus: "completed",
        },
        {
          index: 1686,
          address: "EQChYCDuh0T9725lQ60LMUPxslylOd5VqzA9Tfx5RHdRob5N",
          deploymentStatus: "completed",
        },
        {
          index: 1687,
          address: "EQBlrwBR23HS0f9U_optc57VyaMBSTs8SGy3U_b3gOCuhf8K",
          deploymentStatus: "completed",
        },
        {
          index: 1688,
          address: "EQBBl7j2j7D9KXEoT9J3XTShvaUvzeRNGxMxrxSTV4sPzWRl",
          deploymentStatus: "completed",
        },
        {
          index: 1689,
          address: "EQAL5qO92-RUtlKFBVnzU0n9qIAtmvRISibHIfVQazGlp2kQ",
          deploymentStatus: "completed",
        },
        {
          index: 1690,
          address: "EQCTlV-C6Ii45uL86vAF_IViWFSUn6sFvI5iDXtOmfRKuUwN",
          deploymentStatus: "pending",
        },
        {
          index: 1690,
          address: "EQCTlV-C6Ii45uL86vAF_IViWFSUn6sFvI5iDXtOmfRKuUwN",
          deploymentStatus: "pending",
        },
        {
          index: 1690,
          address: "EQCTlV-C6Ii45uL86vAF_IViWFSUn6sFvI5iDXtOmfRKuUwN",
          deploymentStatus: "pending",
        },
        {
          index: 1690,
          address: "EQCTlV-C6Ii45uL86vAF_IViWFSUn6sFvI5iDXtOmfRKuUwN",
          deploymentStatus: "pending",
        },
        {
          index: 1690,
          address: "EQCTlV-C6Ii45uL86vAF_IViWFSUn6sFvI5iDXtOmfRKuUwN",
          deploymentStatus: "pending",
        },
        {
          index: 1690,
          address: "EQCTlV-C6Ii45uL86vAF_IViWFSUn6sFvI5iDXtOmfRKuUwN",
          deploymentStatus: "completed",
        },
        {
          index: 1691,
          address: "EQDdWOUJhzzb8spx8O-a2t5lgXmrAV4grep5UYmbH5YTYN78",
          deploymentStatus: "completed",
        },
        {
          index: 1692,
          address: "EQC_Z4L-Xb3xQpd6fMwHR8Z5F6eAHQpUKTQs-HI3lS9q0w6w",
          deploymentStatus: "completed",
        },
        {
          index: 1693,
          address: "EQC6RTgTlrAHvu20oolzp8e-EZzZhFyIn0EDReIrD8LuPlpR",
          deploymentStatus: "completed",
        },
        {
          index: 1694,
          address: "EQCJYnXGRxYrTD1ZV4-Xnu5VkzBIPyoX3PulNlo3_hMIqc2B",
          deploymentStatus: "completed",
        },
        {
          index: 1695,
          address: "EQAkLR-BB9pfK9qj-kVjEEL-xCNIqSuPz6VFGOFYlpctKTU1",
          deploymentStatus: "completed",
        },
        {
          index: 1696,
          address: "EQC_naSBSZiVpQDBHFsUQGuzwFp8x2oESAhfOgvdgVar7rpv",
          deploymentStatus: "completed",
        },
        {
          index: 1697,
          address: "EQD4Pyde153AdcZoeBDkyDF8qpovHLiX8QxybPCqiRg1WkQi",
          deploymentStatus: "completed",
        },
        {
          index: 1698,
          address: "EQBlR37EltbAFJQb7sz4tDhHZXSROMCUHTIIGsyTSXPGCBdl",
          deploymentStatus: "completed",
        },
        {
          index: 1699,
          address: "EQDjP1dFvEPea8Bgt0LeDKk3hkJJ0u3oZaOSkYeczPTDrVTo",
          deploymentStatus: "completed",
        },
        {
          index: 1700,
          address: "EQCmNE7jdp9uVbd277de8zzvmjH_ztTn9Zrnm5bkxEMJJ8Ss",
          deploymentStatus: "completed",
        },
        {
          index: 1701,
          address: "EQAK5c_h_SQXDhj6PDQBhLEmNIc3aieoVSOQW6PwxjjU9pkk",
          deploymentStatus: "completed",
        },
        {
          index: 1702,
          address: "EQAXsGwvTw-m7m-7SxNdFeXYyFOcp18n2ANY8vN_4yPgnU5H",
          deploymentStatus: "pending",
        },
        {
          index: 1702,
          address: "EQAXsGwvTw-m7m-7SxNdFeXYyFOcp18n2ANY8vN_4yPgnU5H",
          deploymentStatus: "completed",
        },
        {
          index: 1703,
          address: "EQDNpz-Q4uGr2pnyBvz4CxXkeqg76eKoGJRHvRRAIItzt6uO",
          deploymentStatus: "completed",
        },
        {
          index: 1704,
          address: "EQB69E_fIxZAiF6o_fsfvO9IgjTNgnzVXDZt6aNFgMUOgjK9",
          deploymentStatus: "completed",
        },
        {
          index: 1705,
          address: "EQA0M3SfvIuNMD6bgxphy_3G_aN5_iK8XFwTKX90CQxyNXd9",
          deploymentStatus: "completed",
        },
        {
          index: 1706,
          address: "EQAsu49MkRwwRFjr0jtUtehjAGqm12n1keEdllN3Sneh_sYZ",
          deploymentStatus: "completed",
        },
        {
          index: 1707,
          address: "EQBUgTCP6sGgDTAyA79bGOhMF9xb7Vzwz6GqFr_CTBOs8OH9",
          deploymentStatus: "completed",
        },
        {
          index: 1708,
          address: "EQBYq6eMk6vl-dOihwoQPlNrBpT3TzEk1eDR8IrXlKoHk9UE",
          deploymentStatus: "completed",
        },
        {
          index: 1709,
          address: "EQBG7n-qMsTWDRk1EZDspUSp2_nXiXzY_yWVAlcmZMBW1G5c",
          deploymentStatus: "completed",
        },
        {
          index: 1710,
          address: "EQBCt_pp4p19UKx8q8XfVTh-CdqqSKCiwTzKXIP6OLClJF3P",
          deploymentStatus: "pending",
        },
        {
          index: 1710,
          address: "EQBCt_pp4p19UKx8q8XfVTh-CdqqSKCiwTzKXIP6OLClJF3P",
          deploymentStatus: "completed",
        },
        {
          index: 1711,
          address: "EQAyCuF46cd9avhuqetq6A6cL3PVieJ5Uv_koqrioHRD6Ka3",
          deploymentStatus: "completed",
        },
        {
          index: 1712,
          address: "EQC5oLRkhpVojgTFf1AB2_aIlvpadkY92w0KRNITmw4APipx",
          deploymentStatus: "completed",
        },
        {
          index: 1713,
          address: "EQCzKqcnkRuM5fZt-oXhN94oNW6cmub_ZGNbBh9PneK2MUnV",
          deploymentStatus: "completed",
        },
        {
          index: 1714,
          address: "EQBDmeFoI8a51Ydgyr2Y--XAX-8CV8RSJbxJu28rrJWAZjgG",
          deploymentStatus: "completed",
        },
        {
          index: 1715,
          address: "EQA4wr_rLay5mL8paSmTP2Ypi9xpQneS1-4E2JXd64i0BZdw",
          deploymentStatus: "completed",
        },
        {
          index: 1716,
          address: "EQByHbF3kjHMfbuCSaXWzfAwowWHUGzjQuZOju-3hBkCVvuM",
          deploymentStatus: "completed",
        },
        {
          index: 1717,
          address: "EQBi_CjAlEzmikx61IUOoiZ4sp3yJTiDQDMlBfXcPE60YbKV",
          deploymentStatus: "completed",
        },
        {
          index: 1718,
          address: "EQACQr3C9Md4cbN9JhI7c2XXNSs4Y-MedOGpGcxhAGMzE9tJ",
          deploymentStatus: "completed",
        },
        {
          index: 1719,
          address: "EQBhVH8WLo-ypniESFmr77s3XWvUYEEopsBTzQ8eACOyL6SL",
          deploymentStatus: "pending",
        },
        {
          index: 1719,
          address: "EQBhVH8WLo-ypniESFmr77s3XWvUYEEopsBTzQ8eACOyL6SL",
          deploymentStatus: "completed",
        },
        {
          index: 1720,
          address: "EQDvc9aNID_e60m9Tm0HXGK3o5OtbLDBGyp3aKmIxrG2ZrIG",
          deploymentStatus: "completed",
        },
        {
          index: 1721,
          address: "EQDSJypay6wNGUGTg3ww8N5_IMsXu-2bTx0RGWOpehduGX7E",
          deploymentStatus: "completed",
        },
        {
          index: 1722,
          address: "EQCtl0ijuuHeZ_5mHF7N05rIhWQrrLEAeOaund7F7XXramPw",
          deploymentStatus: "completed",
        },
        {
          index: 1723,
          address: "EQBByi-j1EgtQpeXdE_sumWtBfBLPVAzO_xSmIKrkKiVYJFE",
          deploymentStatus: "completed",
        },
        {
          index: 1724,
          address: "EQBR7FWStKuu3h0J8ssvL7Jd1jNjrq95lE6y22ncx9C5vWbD",
          deploymentStatus: "completed",
        },
        {
          index: 1725,
          address: "EQDtW8b2uTJiY1j8YQRuu75Koss5HK81A3XVj_7Y7-MNp0e7",
          deploymentStatus: "completed",
        },
        {
          index: 1726,
          address: "EQA1gEoqLTOV0gpJb_vi9VeegxI5yNox6Lg2RlqJWb8_XSeK",
          deploymentStatus: "completed",
        },
        {
          index: 1727,
          address: "EQDnTngPV88vRcJQAmRRSte5gdCI_iw4Y-yrzr_hCzDCpDXU",
          deploymentStatus: "completed",
        },
        {
          index: 1728,
          address: "EQAP_Zupjjuq_P0SMZJ1OsUlmZ1UorZmRbqmYXBlETrN1jEf",
          deploymentStatus: "completed",
        },
        {
          index: 1729,
          address: "EQAZ7hLCe3xzHk6SaztoNLqCj4_Vqs2ZnzPHb-uF8r0FIMyl",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "26.json",
      supply: 50,
      currentSupplyIndex: 50,
      copies: [
        {
          index: 1730,
          address: "EQClSTGi9HJFXJiYKDJBzCPfnHH3N_1P5PealBEP0F7XEFLw",
          deploymentStatus: "completed",
        },
        {
          index: 1731,
          address: "EQA71BgdR6T1t8Q9ohNmOdyjVsfg9nVUxLi6a5dRE2j1TopJ",
          deploymentStatus: "completed",
        },
        {
          index: 1732,
          address: "EQBztsm3bYUPH_St1G7YTG8VmiGIcAxbUOCPnSQxMJYA-McF",
          deploymentStatus: "completed",
        },
        {
          index: 1733,
          address: "EQDfHoS4JST2ujZ8Pu6likdruUaRYTCCZnMtBJZiB68NX4I5",
          deploymentStatus: "completed",
        },
        {
          index: 1734,
          address: "EQA55beu3sz-65eCGgmKqdWtX90Qb_Ur43hUM-Qoh72NjMXn",
          deploymentStatus: "completed",
        },
        {
          index: 1735,
          address: "EQA3nZqSZ8q2yNZdGKrgZ7lTFn1EbyC5aQf4uPmXrTuNZhZy",
          deploymentStatus: "completed",
        },
        {
          index: 1736,
          address: "EQB89_Iq2BcptxawuyPkuuurJWo5Wvf4EWzaIlxRVG3iLwSb",
          deploymentStatus: "completed",
        },
        {
          index: 1737,
          address: "EQD4yl7ZKnBE72rx9_ja_1-KnmOZp3fm4Es2oXbp5yR-5Bxh",
          deploymentStatus: "completed",
        },
        {
          index: 1738,
          address: "EQA_87p18W9bp9r46ngtgQkbn3rcLwOI_Ox8byXo5iGmw5zQ",
          deploymentStatus: "completed",
        },
        {
          index: 1739,
          address: "EQB_pSowO8gvVmH7DEj_CrPdOAN_TdtiG9XwJIv67LzQ3jiI",
          deploymentStatus: "completed",
        },
        {
          index: 1740,
          address: "EQAL8u3RFTyucRdjmJORxvCdP5q4oKuTRJ3juPkeXlLSLPi9",
          deploymentStatus: "completed",
        },
        {
          index: 1741,
          address: "EQDSrugEvkeUmWdNRCD4Fc_-wXs6TqIGq0XMder0UH9Hh2Bc",
          deploymentStatus: "completed",
        },
        {
          index: 1742,
          address: "EQBTo8om_tmrlZPQwZxij3Knr5kIJQA4ZltjwvmwRhy3Bunr",
          deploymentStatus: "pending",
        },
        {
          index: 1742,
          address: "EQBTo8om_tmrlZPQwZxij3Knr5kIJQA4ZltjwvmwRhy3Bunr",
          deploymentStatus: "completed",
        },
        {
          index: 1743,
          address: "EQABbfXM7dBV7HSe3rLppMhZg8VQGqa2VT1lMeReyZHSU8np",
          deploymentStatus: "completed",
        },
        {
          index: 1744,
          address: "EQBpJ9R18AEkSBskS_0zlbaoYBo-eqHpecWMQACHxnLI1qMa",
          deploymentStatus: "completed",
        },
        {
          index: 1745,
          address: "EQDOnJ2RPlAMPdsYyFi0i1ckv4zdn05EV0kUYvhc6SP9Prsb",
          deploymentStatus: "completed",
        },
        {
          index: 1746,
          address: "EQA0IslJ9--5p5YsMNY0qs7H0udnoY0GxQgWZStXWeqtc5o7",
          deploymentStatus: "completed",
        },
        {
          index: 1747,
          address: "EQCdo03hj9suG_WT11nRbHerIFD3x1NqK3YRYEw0KDDzE7tl",
          deploymentStatus: "completed",
        },
        {
          index: 1748,
          address: "EQDipWc0W4L-Mq1nJZNHGneLHIk5Bov5un0LR4pciAPMMqAg",
          deploymentStatus: "completed",
        },
        {
          index: 1749,
          address: "EQBhYuE7gzNQ0B2LQ8BuOq7xWwEEF4VztV50ocPDzNHM9s38",
          deploymentStatus: "completed",
        },
        {
          index: 1750,
          address: "EQDQjydsQxvpirCZSNTyNie-zLT1iGTCdG0VI4jbeDkbcFwH",
          deploymentStatus: "completed",
        },
        {
          index: 1751,
          address: "EQBQ3CmhfXG3d7vJxhURtQlaSlmxhge20PEYQHc0BpbGWYzi",
          deploymentStatus: "pending",
        },
        {
          index: 1751,
          address: "EQBQ3CmhfXG3d7vJxhURtQlaSlmxhge20PEYQHc0BpbGWYzi",
          deploymentStatus: "completed",
        },
        {
          index: 1752,
          address: "EQAzOj-6uF36XnCEC999BUeVpewSLLPoGNvdkzMBqv81k3MT",
          deploymentStatus: "completed",
        },
        {
          index: 1753,
          address: "EQCGSMROrcCU5HJI7IHHWPkSyBrpYbiVY-n35MQ11QDPe1I_",
          deploymentStatus: "completed",
        },
        {
          index: 1754,
          address: "EQDk66f7QDwkXyP3vsZniVH2XU_5EzMf7n49lzFs38fsT9Yt",
          deploymentStatus: "completed",
        },
        {
          index: 1755,
          address: "EQDK--7D4i8d1BhFkFx0Jg4gNCYC3TE7jJgb7WQ_EKYgUlH8",
          deploymentStatus: "completed",
        },
        {
          index: 1756,
          address: "EQAZmEpuxkunRtR5IkeqFszSltx9nksKqj-ZlM_mH1UEDZVU",
          deploymentStatus: "completed",
        },
        {
          index: 1757,
          address: "EQBZa-W3zp8wlz2H-9W5xsSQGh3p5rwB-hyYKkSRJ-6j30FU",
          deploymentStatus: "completed",
        },
        {
          index: 1758,
          address: "EQAgwE4VRP2HGoyua4TmhuLcrnyCeSTlXRoX4owXV28yk_2C",
          deploymentStatus: "pending",
        },
        {
          index: 1758,
          address: "EQAgwE4VRP2HGoyua4TmhuLcrnyCeSTlXRoX4owXV28yk_2C",
          deploymentStatus: "completed",
        },
        {
          index: 1759,
          address: "EQDztSR4j5mvXc5rUuqcB-Dc8uDT3shEwjIugfk_Pqon4DUU",
          deploymentStatus: "completed",
        },
        {
          index: 1760,
          address: "EQBn0idqyNlc4NIsWXKQI8RtNoTUAY2KV0tCGiPqr9-y1Hx4",
          deploymentStatus: "completed",
        },
        {
          index: 1761,
          address: "EQCufbUpCdWiIlPAGYYUIAS-CNQNspbcSLwr_sbn1deLeOrK",
          deploymentStatus: "completed",
        },
        {
          index: 1762,
          address: "EQBAVraciil1_iFxiX8JYqHwyOdDNI9qztUyNXYKdKb1Q58m",
          deploymentStatus: "completed",
        },
        {
          index: 1763,
          address: "EQDLbQdD_nmWlzSKMfwtZYPGn384dl_aVw67ObodY2ZMnVwS",
          deploymentStatus: "completed",
        },
        {
          index: 1764,
          address: "EQDBZaTWLu40DKi0bGYJ4FASUeJdN5nO9BqP-FLO9u5gMBLU",
          deploymentStatus: "completed",
        },
        {
          index: 1765,
          address: "EQBpqnmbAXaDLTAnXBSsu92PGk4Xbdd-smywCIBZcno3fIv8",
          deploymentStatus: "completed",
        },
        {
          index: 1766,
          address: "EQBmR4grkK1ukvBnyFpvWR3fzD4TKHV5k5AUJ9XDtaCld9x_",
          deploymentStatus: "pending",
        },
        {
          index: 1766,
          address: "EQBmR4grkK1ukvBnyFpvWR3fzD4TKHV5k5AUJ9XDtaCld9x_",
          deploymentStatus: "completed",
        },
        {
          index: 1767,
          address: "EQAfO5vrnVO2IQeS-2pi8OaOLYS4GE9AP3oKmtuLuLQktKct",
          deploymentStatus: "completed",
        },
        {
          index: 1768,
          address: "EQBd5PdBIvYELVYi4jCeUwZnRQA_9lDS2uUdHLW1fZAgeP81",
          deploymentStatus: "completed",
        },
        {
          index: 1769,
          address: "EQBLdGg9k7OEeluoIvtqg7-9k-WlRTosteTNPLec9s1OGyoP",
          deploymentStatus: "completed",
        },
        {
          index: 1770,
          address: "EQBkEXj3RT605JXYVQR0RX-mpP6cW4-xQdqkBcuwOMmR1nNS",
          deploymentStatus: "completed",
        },
        {
          index: 1771,
          address: "EQBk7WmJ7NMuAgti0_HyJlKZFbvUaWp1-rUBShhaRYdcr85k",
          deploymentStatus: "pending",
        },
        {
          index: 1771,
          address: "EQBk7WmJ7NMuAgti0_HyJlKZFbvUaWp1-rUBShhaRYdcr85k",
          deploymentStatus: "completed",
        },
        {
          index: 1772,
          address: "EQCumOMe7UeDSIuBLDlOXjAwmJLl7aKnzgw00E-887hZFG5w",
          deploymentStatus: "completed",
        },
        {
          index: 1773,
          address: "EQDGYGe7OnrbyoCVdKkwkHKLEBPpg2KT9eh0imDwnUSeAZGU",
          deploymentStatus: "completed",
        },
        {
          index: 1774,
          address: "EQAiHI-pVrBfW918e4otHer67lpwoHtnnuPgTWggBuNuEzqe",
          deploymentStatus: "completed",
        },
        {
          index: 1775,
          address: "EQDoy3C-dZ6hEmd6Am3yQggnQMC-mXlbCBfZAWdHMTEcMXNK",
          deploymentStatus: "completed",
        },
        {
          index: 1776,
          address: "EQAoW2fjgKtBXrNKYY8DYBZ_Fh1Ea2jV77fgpQMGGqt4hHtc",
          deploymentStatus: "completed",
        },
        {
          index: 1777,
          address: "EQDCUxpmMNYWJYczrYy2LYf8njgowg5qDBEfDnTTp_-VIk6Q",
          deploymentStatus: "completed",
        },
        {
          index: 1778,
          address: "EQBML3eFmQLg6zArDLAN2Zkz25EU7HHTTQHAu2Vlqyvi2gPr",
          deploymentStatus: "completed",
        },
        {
          index: 1779,
          address: "EQBqadtOFX6WV9Xnw5FJIGJwjHJnuACBAOD8MMKxGPfouBXX",
          deploymentStatus: "pending",
        },
        {
          index: 1779,
          address: "EQBqadtOFX6WV9Xnw5FJIGJwjHJnuACBAOD8MMKxGPfouBXX",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "27.json",
      supply: 30,
      currentSupplyIndex: 30,
      copies: [
        {
          index: 1780,
          address: "EQAQEgtPbaCKBiUL1KKPAcp-c2LqAEprI_10DNZOq2trLeZT",
          deploymentStatus: "completed",
        },
        {
          index: 1781,
          address: "EQC2s5CfmviGqAB1q1k22jzjIZ_rF6sBEHD-G1gTj5HiPDnF",
          deploymentStatus: "completed",
        },
        {
          index: 1782,
          address: "EQDAUhQLxW36FA0x71XL7zQsg0v6WYBQ1bgtbszOs-z7fPhp",
          deploymentStatus: "completed",
        },
        {
          index: 1783,
          address: "EQB06bxa8CXw4VG_97WqjQ9TEmxXjZmG-Pw6DlXiqgsVPigA",
          deploymentStatus: "completed",
        },
        {
          index: 1784,
          address: "EQDquazE-YhhSaje-wfv6uiAWp8hwNwds6CSWRbvgDr9Of-x",
          deploymentStatus: "completed",
        },
        {
          index: 1785,
          address: "EQBCeLKha1yt1hMdRIXyC8dLsiFCYyumxhY7RtXVEp_Pm4GX",
          deploymentStatus: "pending",
        },
        {
          index: 1785,
          address: "EQBCeLKha1yt1hMdRIXyC8dLsiFCYyumxhY7RtXVEp_Pm4GX",
          deploymentStatus: "completed",
        },
        {
          index: 1786,
          address: "EQCiAPze0_Ozt7PjDbRaNGcqUk_OAIVpkR0wygvSgXtFjp3W",
          deploymentStatus: "completed",
        },
        {
          index: 1787,
          address: "EQB-Zctza8ln3iibVjC8JlyvguU4rF-rcXP7X402qAO2XXT7",
          deploymentStatus: "completed",
        },
        {
          index: 1788,
          address: "EQDGK5Ae-4vHlP0zYMPfFKuYUFOdJ6X-AZmIrOFwA9LMWlpK",
          deploymentStatus: "completed",
        },
        {
          index: 1789,
          address: "EQDoHbeF-AzJ_-NeOM7uRmGUHeOLPLbNHxVHQZVv--aK-to5",
          deploymentStatus: "completed",
        },
        {
          index: 1790,
          address: "EQC8qPfJLjOddKCotdm71He2nIyUDTvziuiUg37z1XwNJ640",
          deploymentStatus: "completed",
        },
        {
          index: 1791,
          address: "EQAnLiO5aHJJruQwIaYp171TQP_vzNGj9Q1dF8REoPJF0nAn",
          deploymentStatus: "completed",
        },
        {
          index: 1792,
          address: "EQBs-0Rb1IdD2F9O-cK91qZFnQOLWfIVVKg6tdnqeK8T_xSe",
          deploymentStatus: "completed",
        },
        {
          index: 1793,
          address: "EQDTwBGO22aBBCgyo8j05S25gc270Zv9SFfcOMV6ddR55Qh-",
          deploymentStatus: "completed",
        },
        {
          index: 1794,
          address: "EQCQ02pLaWwyYa-MHppRhdEIhIBFwIeLn3noo2KYRxFcb0pK",
          deploymentStatus: "pending",
        },
        {
          index: 1794,
          address: "EQCQ02pLaWwyYa-MHppRhdEIhIBFwIeLn3noo2KYRxFcb0pK",
          deploymentStatus: "completed",
        },
        {
          index: 1795,
          address: "EQCviUdBsgccTbENGt5pYcb1_D3L7Nnj8baOYaZK0KBmpD_y",
          deploymentStatus: "completed",
        },
        {
          index: 1796,
          address: "EQBk8SffzAz5bFiQ0c0yw_PxZHDWoQ6b2-IvcsoBqanqUEOu",
          deploymentStatus: "completed",
        },
        {
          index: 1797,
          address: "EQCR3bWWBOkex_5sE9G5kzDYKz9SdHhu69IoMtJgKmb4mfds",
          deploymentStatus: "completed",
        },
        {
          index: 1798,
          address: "EQBgPIQ6u9hffMFOsGgmJnLPtRiU-KyvKEO4ZN--DjGNKQ-R",
          deploymentStatus: "completed",
        },
        {
          index: 1799,
          address: "EQA_n2U8emKsupcJVQewSlVyaM053rXP5hxT_zvWVcaDI_6S",
          deploymentStatus: "completed",
        },
        {
          index: 1800,
          address: "EQDesWYkQGshVhD9IsBVP9rLCmJMMMTxRctk-Z3IHeWJxwO7",
          deploymentStatus: "completed",
        },
        {
          index: 1801,
          address: "EQABaR7kDiR8COcnhOyD4YV84moZULfH2-9MucQSA9PSIW5j",
          deploymentStatus: "completed",
        },
        {
          index: 1802,
          address: "EQCHCI2rjm8OksDNENnmeLUoGbAkoE9Lg37gc0GQf9VyD46A",
          deploymentStatus: "completed",
        },
        {
          index: 1803,
          address: "EQCP4EwLbzCtV77TzlQdNoPZNGZfgHVNeV8vxK7QIT6Xh_nV",
          deploymentStatus: "pending",
        },
        {
          index: 1803,
          address: "EQCP4EwLbzCtV77TzlQdNoPZNGZfgHVNeV8vxK7QIT6Xh_nV",
          deploymentStatus: "completed",
        },
        {
          index: 1804,
          address: "EQBjYAAEfEDuuYFxDgBr2sq5gE5kvIE2L1IPgKhcMPAu3Dtu",
          deploymentStatus: "completed",
        },
        {
          index: 1805,
          address: "EQBPz4VkCMRJ6AS2bPuDPBooosRwRZGnGNhOp-rxQ1jgMOf3",
          deploymentStatus: "completed",
        },
        {
          index: 1806,
          address: "EQCWWkveMsp3ODr_OBt0QcXAy3Xzd16Q25pmNwXSehVdqD0n",
          deploymentStatus: "completed",
        },
        {
          index: 1807,
          address: "EQDdOYIGTywiJb4eOcxREz-9uhj3fe4d0bFbKFdHCQMLafqq",
          deploymentStatus: "completed",
        },
        {
          index: 1808,
          address: "EQBZ2-clKwlLYOWydRiyJ7bDwelbNW2AtbmtZi8afiEO_2bx",
          deploymentStatus: "completed",
        },
        {
          index: 1809,
          address: "EQBYPpn6KHZG20RISt-MkjVICYAE9yr6s88YtGV03TFb5fD5",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "28.json",
      supply: 100,
      currentSupplyIndex: 100,
      copies: [
        {
          index: 1810,
          address: "EQDZp7vblvk2KAkdBP7OaWRPgivihpBSGmgEbngoIf017BoS",
          deploymentStatus: "pending",
        },
        {
          index: 1810,
          address: "EQDZp7vblvk2KAkdBP7OaWRPgivihpBSGmgEbngoIf017BoS",
          deploymentStatus: "completed",
        },
        {
          index: 1811,
          address: "EQAdhckrRPSknQuQ9M5RwEPCvCbOIoc2lEJ11kiuz89yUd3U",
          deploymentStatus: "completed",
        },
        {
          index: 1812,
          address: "EQAbONZTKv_8CBsrkGbtzZn_StyKUcwxCG3DJpq_V9PsdLC3",
          deploymentStatus: "completed",
        },
        {
          index: 1813,
          address: "EQBmFs-LInK1MK7J5qDM3R1snwDKuXhw9OArvSLvgGYJVxgT",
          deploymentStatus: "completed",
        },
        {
          index: 1814,
          address: "EQAHppiaqWVsnaJO3m70TZH824Sffd16HGVH4IKgZLxjEC_d",
          deploymentStatus: "completed",
        },
        {
          index: 1815,
          address: "EQD8lI1FfdALkhfHFyC_35ui_SDgduyC-_-7awpew1NzozDX",
          deploymentStatus: "completed",
        },
        {
          index: 1816,
          address: "EQCFTS0207mVNsevqv-qJ4YPWMZORZ1zSb41k-frjjGddR7L",
          deploymentStatus: "completed",
        },
        {
          index: 1817,
          address: "EQAgMGpDt8eLtdGz8e1izghswXUPBKeKJ9yVZ4UrUtkL8e_R",
          deploymentStatus: "completed",
        },
        {
          index: 1818,
          address: "EQBStYa1P043zXgswJlqSNVWtk8k5qtXECRI-meN8u8D9h5e",
          deploymentStatus: "completed",
        },
        {
          index: 1819,
          address: "EQB3dgNdO6IuGA3KmfRS5nRZ6hr29qDujSFBwclQGsHyzrH0",
          deploymentStatus: "pending",
        },
        {
          index: 1819,
          address: "EQB3dgNdO6IuGA3KmfRS5nRZ6hr29qDujSFBwclQGsHyzrH0",
          deploymentStatus: "completed",
        },
        {
          index: 1820,
          address: "EQCYNbsLcvRll_IiIsjPRR7PvLJ-HR4PedLsgsZyEEVP1xCl",
          deploymentStatus: "completed",
        },
        {
          index: 1821,
          address: "EQBzOW9DSrGJyAA8q9EBy034s6nHztEunGkM28MDKRM3QYvm",
          deploymentStatus: "completed",
        },
        {
          index: 1822,
          address: "EQDYzs6eIGOWQeC26CsGrhv_hWzQjl9LzxMsgzgzAJKRuKB8",
          deploymentStatus: "completed",
        },
        {
          index: 1823,
          address: "EQDrQ5v8bYruQyVJ3wv9nr368jKgwn4kEgs3Y7GiTf-mKyW4",
          deploymentStatus: "completed",
        },
        {
          index: 1824,
          address: "EQBGDejMJDFh7FnC1CAnQ8AN_zBQJRddsK-9GhYMk-rOG3EK",
          deploymentStatus: "completed",
        },
        {
          index: 1825,
          address: "EQCmjq7K90M9Kn0GpRdK2i9jcbDxathSBQwEzQO7zU3FsaGz",
          deploymentStatus: "completed",
        },
        {
          index: 1826,
          address: "EQCyuRIZ4arnRY6HjpRPqEYLSUlDLbPF24IrkBtk9BGIFILK",
          deploymentStatus: "completed",
        },
        {
          index: 1827,
          address: "EQDOnsDR8ji-GfpqbSVJhnxI3mLXRmHB0oT2JhY70H6msyl4",
          deploymentStatus: "completed",
        },
        {
          index: 1828,
          address: "EQBEkEzGC4uHlaPl_VNzX5AoPRYtGDzAk2nZlolJS5t2RJq9",
          deploymentStatus: "pending",
        },
        {
          index: 1828,
          address: "EQBEkEzGC4uHlaPl_VNzX5AoPRYtGDzAk2nZlolJS5t2RJq9",
          deploymentStatus: "completed",
        },
        {
          index: 1829,
          address: "EQBf8IjGd9crc6wN3j0Qmm2xl6L0VtaimN6zDyZRs_pq5wLt",
          deploymentStatus: "completed",
        },
        {
          index: 1830,
          address: "EQCy9rrs2FLonp6y170X6YN4kXEYTHTlV5UDS3b2IQYf2qo8",
          deploymentStatus: "completed",
        },
        {
          index: 1831,
          address: "EQB0-x3A0Zut_tCf8biN9bn4UseS5dQ3wiUU3psLUrBBsSBB",
          deploymentStatus: "completed",
        },
        {
          index: 1832,
          address: "EQDGL-KY1c8WSVil5kJ070w-ohtZKuNgdnKNLw2K4iPTG0o2",
          deploymentStatus: "completed",
        },
        {
          index: 1833,
          address: "EQCy6LO9nUjJMDW2MNxA4r4rkxNeloutk5l9THTdnEP3KDg1",
          deploymentStatus: "completed",
        },
        {
          index: 1834,
          address: "EQA5FH662I-OtBQULu3JO4ZW2rVvJiHtCslL6Lhm1048kedE",
          deploymentStatus: "completed",
        },
        {
          index: 1835,
          address: "EQA2FcWDA-QItGLufnX0WVOwvgcwT1QPQmAjTNMMrnJJhtCF",
          deploymentStatus: "pending",
        },
        {
          index: 1835,
          address: "EQA2FcWDA-QItGLufnX0WVOwvgcwT1QPQmAjTNMMrnJJhtCF",
          deploymentStatus: "completed",
        },
        {
          index: 1836,
          address: "EQC9elE1jBWp8pttsCJvAN-i0IORUe9nuspQJ-W-eR_njn69",
          deploymentStatus: "completed",
        },
        {
          index: 1837,
          address: "EQBepZ8kEAzi0hFBJoKJOydme5qQIqBy86tUNSiuUd9T3txP",
          deploymentStatus: "completed",
        },
        {
          index: 1838,
          address: "EQDyNnLwL7skLaqjH8nuq8zir5CxZetsu8D9aQR4HWkJkdbR",
          deploymentStatus: "completed",
        },
        {
          index: 1839,
          address: "EQB9cpJgRVvU7JHvabEI64t0rIJJKxqhKR9nbHCDL3tifHvz",
          deploymentStatus: "completed",
        },
        {
          index: 1840,
          address: "EQDSx1rsaKQnbHHWFFQ5RJM188a8vLt7Zk0ZM51i_4a_VQpu",
          deploymentStatus: "completed",
        },
        {
          index: 1841,
          address: "EQAqNGfvbmMfpjxk5A8yNt-lx67iZdLp0rKyk1g1y7XrQzDA",
          deploymentStatus: "completed",
        },
        {
          index: 1842,
          address: "EQCCg3m8YqgC5bzWi-YRUiFirof4f2Uj1XUDLXLqQAFfWKaV",
          deploymentStatus: "pending",
        },
        {
          index: 1842,
          address: "EQCCg3m8YqgC5bzWi-YRUiFirof4f2Uj1XUDLXLqQAFfWKaV",
          deploymentStatus: "completed",
        },
        {
          index: 1843,
          address: "EQBgurfCDpLnt2KUWMCV7AmUy13jZ8aoxOy5JJX_Npi8nGfi",
          deploymentStatus: "completed",
        },
        {
          index: 1844,
          address: "EQAb7yWuUoOVHWhFLGt1IHKpje4r0ReORjbDeFn3hoCl7Zy8",
          deploymentStatus: "completed",
        },
        {
          index: 1845,
          address: "EQC-H1C3URWP8AohQpXM7PrB70jAv3cudAf0c58sDj8Zq8YO",
          deploymentStatus: "completed",
        },
        {
          index: 1846,
          address: "EQBVe_utFVLgOgiEYlAJ5_H1jFXLYBicUno3lkyqeI8nHwAi",
          deploymentStatus: "completed",
        },
        {
          index: 1847,
          address: "EQA8m8qI_Q8tOZqTmYCaUjST__TzYdNMRkF4_eiYf9UmtAt9",
          deploymentStatus: "completed",
        },
        {
          index: 1848,
          address: "EQDV-qzt-ug-AHa48NS_5OmIxWeh1gPXVZHvo3ZkhfkHoejv",
          deploymentStatus: "completed",
        },
        {
          index: 1849,
          address: "EQC8Sazz-Ov6k5HbvIoVTY9QJnqLhrfl3dnaK1NjiHNW3XIN",
          deploymentStatus: "completed",
        },
        {
          index: 1850,
          address: "EQAPuDBpKsbzLDMPZByle0sb5xXoAMqSEc8PrMt4Lean71dA",
          deploymentStatus: "completed",
        },
        {
          index: 1851,
          address: "EQBy8pqKnMia3QkOKLB3lF19IKcV7YxONWV4Q74VoAWNBYAb",
          deploymentStatus: "pending",
        },
        {
          index: 1851,
          address: "EQBy8pqKnMia3QkOKLB3lF19IKcV7YxONWV4Q74VoAWNBYAb",
          deploymentStatus: "completed",
        },
        {
          index: 1852,
          address: "EQCYYONJk2t2O2_VymyPu5YYfjI7-52jTDWk-PTXwiyS9YBq",
          deploymentStatus: "completed",
        },
        {
          index: 1853,
          address: "EQDX0Lps55HtFseiGFBRfQqSEeNQyHRmhyzPBsy2PmFufk-L",
          deploymentStatus: "completed",
        },
        {
          index: 1854,
          address: "EQDKMzgTA7HEdTn4JcZWSGJMJBw20hwVW98Aji88kc13uVty",
          deploymentStatus: "completed",
        },
        {
          index: 1855,
          address: "EQAO9aHllfs3JVeqBjEb15IkAqV1SNt3bP6zL-XukT1rY-xr",
          deploymentStatus: "completed",
        },
        {
          index: 1856,
          address: "EQBi_KZMMFD-rfgC6TvZEH1P5EWPwTIsN7bxssQlcK7KgWQF",
          deploymentStatus: "completed",
        },
        {
          index: 1857,
          address: "EQAYH3R3KOJ-ZKeht2KRMrmZ67QSiLbWaPThIbxFeQmJLfY6",
          deploymentStatus: "completed",
        },
        {
          index: 1858,
          address: "EQDbjjqVpm0fbZNjbap-f87XjzZGLX6fforo28wmlANwcvXS",
          deploymentStatus: "completed",
        },
        {
          index: 1859,
          address: "EQDGj3cPlPspBe9zaiBxMFyrgZD-VrsegeEcuCDUtcnXbTGV",
          deploymentStatus: "pending",
        },
        {
          index: 1859,
          address: "EQDGj3cPlPspBe9zaiBxMFyrgZD-VrsegeEcuCDUtcnXbTGV",
          deploymentStatus: "completed",
        },
        {
          index: 1860,
          address: "EQBW2QQEojQORDowkXPRL1YNL4v-VQkZt3wy0vBBq_xdXKZ1",
          deploymentStatus: "completed",
        },
        {
          index: 1861,
          address: "EQAM2FvnSb_lCU1nzM3PZUDoTLUxLDYP1T7k6G3x1ugST9DK",
          deploymentStatus: "completed",
        },
        {
          index: 1862,
          address: "EQBZJSrrDWst6NCqhAMm4MRiZcplzk-Q1hg4Ieg0YgTLuX2H",
          deploymentStatus: "completed",
        },
        {
          index: 1863,
          address: "EQCoRdZ96ncwxTTyQ1KM4OBwJ4MOMv_LgBiXsHNgmsiCQFEm",
          deploymentStatus: "completed",
        },
        {
          index: 1864,
          address: "EQCJ4roSGGQAtL8Aqom9DwNqg6Or0R4tXm5QdLixuq2A51D1",
          deploymentStatus: "completed",
        },
        {
          index: 1865,
          address: "EQDqW3W1FM96WEmwORPZGapdTLQgoPNVtDORimtA2bwrfJpb",
          deploymentStatus: "completed",
        },
        {
          index: 1866,
          address: "EQDWTXlUyER_ylOf7WO353ak7s3_f_C3z8GNo2_3cXmYJUmG",
          deploymentStatus: "completed",
        },
        {
          index: 1867,
          address: "EQBh83c0KX2ORVLVqBPu30mgMYhRAZff1aht44ddWx0zKj2Y",
          deploymentStatus: "pending",
        },
        {
          index: 1867,
          address: "EQBh83c0KX2ORVLVqBPu30mgMYhRAZff1aht44ddWx0zKj2Y",
          deploymentStatus: "completed",
        },
        {
          index: 1868,
          address: "EQBxCPzODsttD2NXspSqjy0x4EsGDroCl-kzZK8jHpAd5_yb",
          deploymentStatus: "completed",
        },
        {
          index: 1869,
          address: "EQCG090vk4P3OPxI2UXoTBscwdvMY3orIPdIWmcxt1zTzZal",
          deploymentStatus: "completed",
        },
        {
          index: 1870,
          address: "EQBulEX5JoiAzdmrCaBHd6idgecpK8XoyOut3dGVAXdfs3O9",
          deploymentStatus: "completed",
        },
        {
          index: 1871,
          address: "EQB8_et_bhUMmI6sOpOQKLJLRuHTa0OPMCpc0X-qbyLR5B6R",
          deploymentStatus: "completed",
        },
        {
          index: 1872,
          address: "EQDFpO6RkMWHah_P1m7mUxH8jBJG9eeM-MhAuy_DgmLsOpQk",
          deploymentStatus: "completed",
        },
        {
          index: 1873,
          address: "EQDLmGp7wJSn7PLS6iW1pIUWkV7KgQ2AEfOvJVYngMrNIGYh",
          deploymentStatus: "completed",
        },
        {
          index: 1874,
          address: "EQAGk8a9bohH0gq0bUMalY0B1dqj-Dx-wYfoAJ7ZyNCxnjSr",
          deploymentStatus: "completed",
        },
        {
          index: 1875,
          address: "EQBTGnwgw2nin60p2U7dG1iZflRAvUiXCgDeZuB4heF23Bpb",
          deploymentStatus: "completed",
        },
        {
          index: 1876,
          address: "EQAl_kFQMFsNKSor5YR8ZYDE9WMFQtB8Vbji2Gq09zorcuYM",
          deploymentStatus: "pending",
        },
        {
          index: 1876,
          address: "EQAl_kFQMFsNKSor5YR8ZYDE9WMFQtB8Vbji2Gq09zorcuYM",
          deploymentStatus: "completed",
        },
        {
          index: 1877,
          address: "EQBeVFmMxk_q2BCmgUHgSlqqGZouvrswd2bK_YpF4rgpKynz",
          deploymentStatus: "completed",
        },
        {
          index: 1878,
          address: "EQBJvJW3AQN4Poivqt5GPNWCrSEJF0PE9RDiVbMchp1crYTC",
          deploymentStatus: "completed",
        },
        {
          index: 1879,
          address: "EQDK3CKA3Y0N7S7uXIbmPKCXvRO9WU55JujXACNt4HmgKWpj",
          deploymentStatus: "completed",
        },
        {
          index: 1880,
          address: "EQBINs9kfF_dwO-GRCeFfUwKSQ0dmX3bqANWfCI_0ozOSAGM",
          deploymentStatus: "completed",
        },
        {
          index: 1881,
          address: "EQCcgbxHnkQGDiShwuYkC8dU5Oom5qatfo9So19wov_PCafw",
          deploymentStatus: "completed",
        },
        {
          index: 1882,
          address: "EQAPDKrhyENTRqiFPzS0maN2mYKinb-cT-erW09dzkazuWMy",
          deploymentStatus: "completed",
        },
        {
          index: 1883,
          address: "EQCctA1e97T1jLpPUlMv2GdAgynb3C0z7utTC0xq2WA5RN-i",
          deploymentStatus: "completed",
        },
        {
          index: 1884,
          address: "EQCSpH6YrshTVsHjU3hf7Z4Wz88wfeS8BQ7p8lTE_29MX1fc",
          deploymentStatus: "completed",
        },
        {
          index: 1885,
          address: "EQBcwc3mq-VbRPy08GPCNXG-Dv66gXXSYvgL5BT7J4V8xixQ",
          deploymentStatus: "pending",
        },
        {
          index: 1885,
          address: "EQBcwc3mq-VbRPy08GPCNXG-Dv66gXXSYvgL5BT7J4V8xixQ",
          deploymentStatus: "completed",
        },
        {
          index: 1886,
          address: "EQCnx7lRDO0xPWwSA3yMGMtTurxsZGeTctazyXLC5HGwOukM",
          deploymentStatus: "completed",
        },
        {
          index: 1887,
          address: "EQDyCtpOXOWt373gyAAwcHWEchY-U7i4XlRM87MpdECV3X8J",
          deploymentStatus: "completed",
        },
        {
          index: 1888,
          address: "EQCDEqU17QpjJ8T1OuOVnhK3GC0q6-tfLUHl0YGhcHYhSouE",
          deploymentStatus: "completed",
        },
        {
          index: 1889,
          address: "EQAlHev6mKxNorYIeiafVZ_SOSJORx17RVTRW0sAWMD149JZ",
          deploymentStatus: "completed",
        },
        {
          index: 1890,
          address: "EQBEMR8daB2z4h4CXnMFDNwk7NleZ0DEIKNvemCKvibwspDw",
          deploymentStatus: "completed",
        },
        {
          index: 1891,
          address: "EQDpYMxOJ-3Mo01AxUUwcoh-EfIpsxKMOqfCyRuKnlut8yX_",
          deploymentStatus: "completed",
        },
        {
          index: 1892,
          address: "EQD2NrMIRFJsGAG8gcQtCyOHpQAN1rKGW88d43vrLNhFhKXH",
          deploymentStatus: "completed",
        },
        {
          index: 1893,
          address: "EQBi3VPcYlJxVOx6_ILn1naR597nMZIg8tCBUJzIQ9vklgn0",
          deploymentStatus: "completed",
        },
        {
          index: 1894,
          address: "EQBsC_tW_QMlUsvB0O23B1k75hF4JTo9QUI1kw92KXvIvhyk",
          deploymentStatus: "pending",
        },
        {
          index: 1894,
          address: "EQBsC_tW_QMlUsvB0O23B1k75hF4JTo9QUI1kw92KXvIvhyk",
          deploymentStatus: "completed",
        },
        {
          index: 1895,
          address: "EQCEdrzPaO90vYTpiYXS84f3Zgz5GbhJ-n2dIeT7EbPCK6ja",
          deploymentStatus: "completed",
        },
        {
          index: 1896,
          address: "EQBUzj_TeWdLkzgU_4Qdx_VOAHVGezC-r43vsPdMqUDN7S3Q",
          deploymentStatus: "completed",
        },
        {
          index: 1897,
          address: "EQBENyIwbXjN6Dt5WpdiS94w6TtYdQFUICZUkIOXTyl_r7Za",
          deploymentStatus: "completed",
        },
        {
          index: 1898,
          address: "EQAvROuJWK_VcmYkV4VRAzxawSpRLuV67BT-X8ezNfeFf3ww",
          deploymentStatus: "completed",
        },
        {
          index: 1899,
          address: "EQD3Naz4Yqpq29GK5e2_sRMzF2LHRMUzh-xWXXhz__POH0bf",
          deploymentStatus: "completed",
        },
        {
          index: 1900,
          address: "EQAVvGiGobHWH1NlASmDpLyTWN4UxQeXlvLZ5aPh6JQIa7QI",
          deploymentStatus: "completed",
        },
        {
          index: 1901,
          address: "EQAJoMexPUJ-nV5HSehhi8Zw7JEr0r-nqZUuhrcHW-g_Pg59",
          deploymentStatus: "completed",
        },
        {
          index: 1902,
          address: "EQAqBNa6SnTw239_9RCZzxkD9ttP63wfHPaJMUfSkhtskFja",
          deploymentStatus: "completed",
        },
        {
          index: 1903,
          address: "EQC-YVT_-mnynnVHIbhzjX2Q-8LbN_CJa5Y39mDvjt99DkeR",
          deploymentStatus: "completed",
        },
        {
          index: 1904,
          address: "EQAQ8GCktPFZrBsRLvHf6V9zXQZPUSfGfV2K27Sz4MGW0ZpP",
          deploymentStatus: "pending",
        },
        {
          index: 1904,
          address: "EQAQ8GCktPFZrBsRLvHf6V9zXQZPUSfGfV2K27Sz4MGW0ZpP",
          deploymentStatus: "completed",
        },
        {
          index: 1905,
          address: "EQChYQwxQtMNfPiToD-jzUyD4yVjmQ2sIAysl2kiwdMOmRnp",
          deploymentStatus: "completed",
        },
        {
          index: 1906,
          address: "EQAmVFen0qYijSNMQVIs0C0Ymy-kKh8FqvQYmIUN-B8d-0VI",
          deploymentStatus: "completed",
        },
        {
          index: 1907,
          address: "EQATF0yTc6pjEgyvbX5yayw4Z4RTVjvGoPqJgsAzEZxssX6x",
          deploymentStatus: "completed",
        },
        {
          index: 1908,
          address: "EQAoAmZVXOnQRi7O1srgBV2nopHQiQ3HJjWSp1uXSa6MUJVM",
          deploymentStatus: "completed",
        },
        {
          index: 1909,
          address: "EQDsJpa2fW3Mh_qXMMZlIdCnMCxq_8ABCpoOAFIqrgRoi3vj",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "29.json",
      supply: 30,
      currentSupplyIndex: 30,
      copies: [
        {
          index: 1910,
          address: "EQDG9NF3Esp284FB36VmEae08d9Eub70EIKQtBMiAV1XdlCV",
          deploymentStatus: "completed",
        },
        {
          index: 1911,
          address: "EQCT0RT77pJTe6zk5-Wke3U5vKsbKLXsCazeHO7P_cEdYte5",
          deploymentStatus: "completed",
        },
        {
          index: 1912,
          address: "EQA64syQp_nLZEfAJ0OxNrKkKIXXddXRxCgkVHdzuZnhAaGv",
          deploymentStatus: "completed",
        },
        {
          index: 1913,
          address: "EQCRrGb-cUfxeU6AA2cJ8VxFUd0oP_nTONFML5lkX7BLqtp0",
          deploymentStatus: "pending",
        },
        {
          index: 1913,
          address: "EQCRrGb-cUfxeU6AA2cJ8VxFUd0oP_nTONFML5lkX7BLqtp0",
          deploymentStatus: "completed",
        },
        {
          index: 1914,
          address: "EQB0-h2aJQMoX1A8bR98wTQ6_IhH308hExqHvrLABHhf_XVG",
          deploymentStatus: "completed",
        },
        {
          index: 1915,
          address: "EQC_QTtKr3qFeoAAkICY07arz8rUyQUMmYfPZRPxOTcKX1d9",
          deploymentStatus: "completed",
        },
        {
          index: 1916,
          address: "EQAYVmUvJnewA8slJJ1URSmdaUhT2GxnpnKoyR3Q4vTANFkZ",
          deploymentStatus: "completed",
        },
        {
          index: 1917,
          address: "EQBHG9dv2FhW3mzPQnBhsrTqhxbQteNcPNUuoDZeCboJsL-w",
          deploymentStatus: "completed",
        },
        {
          index: 1918,
          address: "EQDe59cIic7vlL2CcPiWpet9hKmpspBjpHelujqdaY2JvkEc",
          deploymentStatus: "completed",
        },
        {
          index: 1919,
          address: "EQDwg18PKK9oXlZpvUqTky-THcyrtqhyVeG_VB1kbs4zmu2r",
          deploymentStatus: "completed",
        },
        {
          index: 1920,
          address: "EQBjA3loY1MvRIOGoaqIhIqsyFw1nl9d-f6xqaJkAUvtSpJE",
          deploymentStatus: "completed",
        },
        {
          index: 1921,
          address: "EQDXwyLxTxR4kqHGyzQze_ztRhmk7LM65vOpZOy4rSvwcxEU",
          deploymentStatus: "completed",
        },
        {
          index: 1922,
          address: "EQCqsOv6Y47ozmVnN9TXUcZvmgW5vVtninFwKMauSfOq_9t0",
          deploymentStatus: "pending",
        },
        {
          index: 1922,
          address: "EQCqsOv6Y47ozmVnN9TXUcZvmgW5vVtninFwKMauSfOq_9t0",
          deploymentStatus: "completed",
        },
        {
          index: 1923,
          address: "EQDAQvhMIyNzwVCfCrf-30zSZzcxMwCB6iEq1JLG8E1tQVE9",
          deploymentStatus: "completed",
        },
        {
          index: 1924,
          address: "EQBD473KtVwUIN83qQN2S9oKrME59uGoZpxu2Dzyfb9R6cVX",
          deploymentStatus: "completed",
        },
        {
          index: 1925,
          address: "EQDM9Pql1L4lAg2Hh6vGoL3dPhKu6jxVPHfCk-BBKw9CbxNb",
          deploymentStatus: "completed",
        },
        {
          index: 1926,
          address: "EQD-SAOf7RirTT4-oxCbWFuYtkHAth6FxGzslR7cQobvn6J-",
          deploymentStatus: "completed",
        },
        {
          index: 1927,
          address: "EQCaBB_HZS5GvhYv7bIRA43YReLImQd4TTGH0PBuIo9EimSU",
          deploymentStatus: "completed",
        },
        {
          index: 1928,
          address: "EQBF11WMHY4V4QxO88G07CB42R27DcqHOR9pOjpsaBHKJxHY",
          deploymentStatus: "completed",
        },
        {
          index: 1929,
          address: "EQCWqdD4yKXjHtKh-j19cp_MP6buDbFkcSADi88xPOg4CKJS",
          deploymentStatus: "completed",
        },
        {
          index: 1930,
          address: "EQCid97uXsoR17voXIfPXCCOXrD5ddX3CZ2-N9is6JkKxeHh",
          deploymentStatus: "completed",
        },
        {
          index: 1931,
          address: "EQBAcLXMBPA_sVmrsYiGIXILQK3uojf2pyr9JcpSSZAPUP7d",
          deploymentStatus: "pending",
        },
        {
          index: 1931,
          address: "EQBAcLXMBPA_sVmrsYiGIXILQK3uojf2pyr9JcpSSZAPUP7d",
          deploymentStatus: "completed",
        },
        {
          index: 1932,
          address: "EQBc0b_ZfMClmKXLTD8WqhqXfMBkYwbgBJdLH00rP0C7BxrA",
          deploymentStatus: "completed",
        },
        {
          index: 1933,
          address: "EQBKeW1Swn_uacNO0Z_EOymoskuN4JFNwNkZ-4N-qXf99o9f",
          deploymentStatus: "completed",
        },
        {
          index: 1934,
          address: "EQCPRKYkQ-Z1IKyTGsbDoerTAMxlj171WnLc5CHTrfaKtnVG",
          deploymentStatus: "completed",
        },
        {
          index: 1935,
          address: "EQB7yPOLJAa737pLinC4Sp1wTGCaNTL_5K9rtK_H28JddSku",
          deploymentStatus: "completed",
        },
        {
          index: 1936,
          address: "EQArgl4DJ_FSiJuJRFEHLO39ptQXdjSWR5SwM6_-1B9yaAWC",
          deploymentStatus: "completed",
        },
        {
          index: 1937,
          address: "EQBU0zZFVfII0DUiyXLTuHawehKcihx0Dtq7C_TAoPoJd2C-",
          deploymentStatus: "completed",
        },
        {
          index: 1938,
          address: "EQDgUfXInpI1NjXG3X4fWqvYsVuVzdKqrBPZ4wKkza98ljuP",
          deploymentStatus: "completed",
        },
        {
          index: 1939,
          address: "EQAEwwOrAQtaV4nyZrmL5wFzHrwX2abdQUIM8ComvTMVDqot",
          deploymentStatus: "pending",
        },
        {
          index: 1939,
          address: "EQAEwwOrAQtaV4nyZrmL5wFzHrwX2abdQUIM8ComvTMVDqot",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "30.json",
      supply: 37,
      currentSupplyIndex: 37,
      copies: [
        {
          index: 1940,
          address: "EQD9vqlQvmEqczjwo-gGLUsC8oY2QNJK15Lh0ig4ji9K8GIg",
          deploymentStatus: "completed",
        },
        {
          index: 1941,
          address: "EQCglQfwXDBab4DNSuMkLe_xQYq3PbAiB0FPALtXLyZUM4uN",
          deploymentStatus: "completed",
        },
        {
          index: 1942,
          address: "EQDIfOCqpC0aHYfWkXVR6d5JGQmINYZ5O-fsLXVc_ZdW3IIt",
          deploymentStatus: "completed",
        },
        {
          index: 1943,
          address: "EQAirj0QC2KAdCl98T7oCdmbRPONUdJS9afGtp12h8FHbgZh",
          deploymentStatus: "completed",
        },
        {
          index: 1944,
          address: "EQAbsW3ISTjeKbYPyJY_YUniwiaB_n2VC7_6eKlMcDHexk40",
          deploymentStatus: "completed",
        },
        {
          index: 1945,
          address: "EQCNc46wlVBuGT8ATo3qunCNzt2DvCjHJwpXmnPAf2JzShLy",
          deploymentStatus: "completed",
        },
        {
          index: 1946,
          address: "EQC-TR20OuNFM1Wd87l10bM8iUUj5jvI8Uz4naRkoJ3kTuxq",
          deploymentStatus: "completed",
        },
        {
          index: 1947,
          address: "EQB6LgNNpSH7uY5kYtMZxksRQUCJO7xi6jy7ojWhUC0g2hYG",
          deploymentStatus: "completed",
        },
        {
          index: 1948,
          address: "EQB0p5gY6gDqOgfj2Eo513BfuLXSsRBaP2fYYRTtqgEhNbRd",
          deploymentStatus: "pending",
        },
        {
          index: 1948,
          address: "EQB0p5gY6gDqOgfj2Eo513BfuLXSsRBaP2fYYRTtqgEhNbRd",
          deploymentStatus: "completed",
        },
        {
          index: 1949,
          address: "EQAoePR2pUwK5GW2Dz5FBTUq_KJVUd4DaZIK8swnn3gQGTVd",
          deploymentStatus: "completed",
        },
        {
          index: 1950,
          address: "EQCEnHBqkz_lfpBGQnyUp_NhX3QEbHRMq0rIX6KtKAIQNj4Z",
          deploymentStatus: "completed",
        },
        {
          index: 1951,
          address: "EQCSMO7w65sU4U4_XO7vvayiox06B3CqO_mszfbMSuKQRL5P",
          deploymentStatus: "completed",
        },
        {
          index: 1952,
          address: "EQALU9_xv66w4Vb8VqkJytTTyaZUKQDX3QF8rBb7VvuQbk6u",
          deploymentStatus: "completed",
        },
        {
          index: 1953,
          address: "EQAbjyXFauqdI3HzOwv5JCYRw2C-jjEfdVi0kRF4eCsfjSlG",
          deploymentStatus: "completed",
        },
        {
          index: 1954,
          address: "EQDyQ3fBL5JJ10YcaEAhitX885Wt7zC8JfUOKd0teRLBxuD4",
          deploymentStatus: "completed",
        },
        {
          index: 1955,
          address: "EQCr7uiwNJjtTSnZvtZyXEmsuwzOBOVOvwd7qa070yf1DPv-",
          deploymentStatus: "completed",
        },
        {
          index: 1956,
          address: "EQBS1YYE_ogEj7rURiD0VsfGsMOzUttZ6ZMqs-OQfKxf9ov1",
          deploymentStatus: "completed",
        },
        {
          index: 1957,
          address: "EQDJpzjub9KICSEDTaM9f5AZxKR4nFi9v_v3BmfAoczvcuSQ",
          deploymentStatus: "pending",
        },
        {
          index: 1957,
          address: "EQDJpzjub9KICSEDTaM9f5AZxKR4nFi9v_v3BmfAoczvcuSQ",
          deploymentStatus: "completed",
        },
        {
          index: 1958,
          address: "EQCYiFkj8rmBEThTpH6zoZ0mfeMP61NNEGubxCF5iPUkGU5r",
          deploymentStatus: "completed",
        },
        {
          index: 1959,
          address: "EQC9YSKrAZBHyFiEUJ6SRX1QMtiOpUG9isP7hFclBB_dn4vl",
          deploymentStatus: "completed",
        },
        {
          index: 1960,
          address: "EQDOqXMmuuqEOSUKo7n-HfZcRk1XHimi01nH5zGuX-xil3k8",
          deploymentStatus: "completed",
        },
        {
          index: 1961,
          address: "EQAKR5dMxNuPLXGYipFltdrlKzqRVR_0Pzh70u4nxSLLQ7bp",
          deploymentStatus: "completed",
        },
        {
          index: 1962,
          address: "EQADwFwhghgXjFrB4hY7oJXOKVXwsaYCTKmAhUDNFr0H3Nal",
          deploymentStatus: "completed",
        },
        {
          index: 1963,
          address: "EQCS6af99Sk_-vB25wFZ007CWnDL4c8Gj5N8rppXXQO9Nm34",
          deploymentStatus: "completed",
        },
        {
          index: 1964,
          address: "EQDZu2kaRjxnrnFmjgOtbT6oulnT3GPSQ8hOE1cWbod0ztPF",
          deploymentStatus: "completed",
        },
        {
          index: 1965,
          address: "EQBuY-5jXp59cC2XBQzIgPQHzZep4oPLpUIShTH__mI-pG1v",
          deploymentStatus: "completed",
        },
        {
          index: 1966,
          address: "EQAfE6KnaHubt5e7NaBO8UuGqs-G1olrLy4EIwoLwIxTL6Av",
          deploymentStatus: "pending",
        },
        {
          index: 1966,
          address: "EQAfE6KnaHubt5e7NaBO8UuGqs-G1olrLy4EIwoLwIxTL6Av",
          deploymentStatus: "completed",
        },
        {
          index: 1967,
          address: "EQAnPWUKyKkQR5p4Wzg_bIMRybAcniNxhNKW7c_irnZCBYPg",
          deploymentStatus: "completed",
        },
        {
          index: 1968,
          address: "EQCca6lh0_9emPKu6MLOmQ7tKAtvkW3Dl2tHIAjLxDXKdN1u",
          deploymentStatus: "completed",
        },
        {
          index: 1969,
          address: "EQDt9q7KWv4l4X6UORbhtubfPaXqgmNirVZETmS1ecMy944q",
          deploymentStatus: "completed",
        },
        {
          index: 2000,
          address: "EQAte59RGVdZ-aekx8AP4O0nRsbIrO012bY2_M2Itl1rxyi9",
          deploymentStatus: "completed",
        },
        {
          index: 2001,
          address: "EQCu_RUMx3U4gBuhefsQQbtvnwigiLX0xHedoG_QjolSdMF-",
          deploymentStatus: "completed",
        },
        {
          index: 2002,
          address: "EQA5PiLHAjvjHk_ftciM0JYfdUEzgTeFCgwSSBaH-DvU9_D9",
          deploymentStatus: "completed",
        },
        {
          index: 2003,
          address: "EQCluqsXfq_X_QwVQYFcD7Tm3U41SmB3lLD31cqDzYMeKTLT",
          deploymentStatus: "completed",
        },
        {
          index: 2004,
          address: "EQBSSH41gxotnw-tUhV__WqgIAKD7yD-9SztpaJG7Zroa4hp",
          deploymentStatus: "completed",
        },
        {
          index: 2005,
          address: "EQDbmjJCIPYPCbs9moOxIkz-uZz-l6f7KxtHGSFKKgPRLLmj",
          deploymentStatus: "completed",
        },
        {
          index: 2006,
          address: "EQBuaEBO8wq-y1RnOc70ojCMatEkjOAWCtGIRnvdLqFZiNsa",
          deploymentStatus: "completed",
        },
      ],
    },
    {
      metadataFile: "31.json",
      supply: 30,
      currentSupplyIndex: 30,
      copies: [
        {
          index: 1970,
          address: "EQDpmiU0BOha9AiYAt3REPVIekMYx9pAuh0Q-vBQwq7omnaY",
          deploymentStatus: "completed",
        },
        {
          index: 1971,
          address: "EQDJpC_X8tddl8Jzjuo9h159_u06kC7D4HvnXnFb6JZ9vhlA",
          deploymentStatus: "completed",
        },
        {
          index: 1972,
          address: "EQAEzLoFEpZE-qMAD11H5PtNW8A5oMS_iz9i1ZrOCZ-wquEm",
          deploymentStatus: "completed",
        },
        {
          index: 1973,
          address: "EQBVZoQgDZWlyZgb3tm3SLYXQ8EHAP_04TGzDKfTZPRRe5cW",
          deploymentStatus: "completed",
        },
        {
          index: 1974,
          address: "EQATu1uGRDrs1ZbZIwt4Ehii62Ih_6W3_PvsJ-sbTkK9g0lN",
          deploymentStatus: "completed",
        },
        {
          index: 1975,
          address: "EQCsrLbXziH4LHKVrsAWaqeVu1Um_X9obENivNx45ICYph4H",
          deploymentStatus: "pending",
        },
        {
          index: 1975,
          address: "EQCsrLbXziH4LHKVrsAWaqeVu1Um_X9obENivNx45ICYph4H",
          deploymentStatus: "completed",
        },
        {
          index: 1976,
          address: "EQD5oZx5gS7v8oToVmPWe4dtNDiSB0WFYBRSTFp7Tgd-r5um",
          deploymentStatus: "completed",
        },
        {
          index: 1977,
          address: "EQDFRTJsVws0QFutTRss7wbnBIGmLwjOSPPyMgnS0NcY0dZH",
          deploymentStatus: "completed",
        },
        {
          index: 1978,
          address: "EQBPlqYp3qyXu7wxUd3W3jssOPFbUNxL8ncG4WBZBtQ2uvDT",
          deploymentStatus: "completed",
        },
        {
          index: 1979,
          address: "EQCTpYXDhEtDi5JKlt7e1ksNGMILu1RT7VdiUJeI3-NCxMj6",
          deploymentStatus: "completed",
        },
        {
          index: 1980,
          address: "EQBd1tBO38Nc0gCDP1taFKwEMlvm1RKSwovJrYEdEQT4MA4Z",
          deploymentStatus: "completed",
        },
        {
          index: 1981,
          address: "EQCboDyaVY88SzI06AIAPWJey_sf_YMlw4v10fCER0UwZFJd",
          deploymentStatus: "completed",
        },
        {
          index: 1982,
          address: "EQCbGBnffEtHTwZ-CynmKodzPN8vvuH8q1bQvx0au8BH4dIR",
          deploymentStatus: "completed",
        },
        {
          index: 1983,
          address: "EQBknjt9ulPCNwgcaHzErzszmEFa6auRl1PeglUO7BdtoSbR",
          deploymentStatus: "completed",
        },
        {
          index: 1984,
          address: "EQC1RLax40Irim9RGGd4aj9vVwYrT__mE7sMV1gJ1mG-GjHu",
          deploymentStatus: "completed",
        },
        {
          index: 1985,
          address: "EQACemPxcFFZbBhYf4HGHCK2SOlBm4L6zt_oWP-s0gqPNLnH",
          deploymentStatus: "pending",
        },
        {
          index: 1985,
          address: "EQACemPxcFFZbBhYf4HGHCK2SOlBm4L6zt_oWP-s0gqPNLnH",
          deploymentStatus: "completed",
        },
        {
          index: 1986,
          address: "EQBM3L2FbNUzajMQ7DBq9VQZOocUgn5ahNTgiEv5W3Inf4o_",
          deploymentStatus: "completed",
        },
        {
          index: 1987,
          address: "EQA6ybobHEQQ6w98CKOZbVr8-qucXsIpVyWe9sT6WDiK0sCU",
          deploymentStatus: "completed",
        },
        {
          index: 1988,
          address: "EQA2CUNLh0bQ6AES0SAGEipAQ4q6EzdQnvOLNzuwrwMyYZWy",
          deploymentStatus: "completed",
        },
        {
          index: 1989,
          address: "EQBMhqN08nITm8IFNjqbfi9SAwPH7j7PLe226dhXtRhBU0H9",
          deploymentStatus: "completed",
        },
        {
          index: 1990,
          address: "EQBZq3qObdkXvwMomjmEwcMAMPB9bLYcq1Hv3EC1BAUiL2qL",
          deploymentStatus: "completed",
        },
        {
          index: 1991,
          address: "EQDA1zvciVPRxr4C9_dNOk8Dmekhe8tsrOPNvW-yghopWEDE",
          deploymentStatus: "completed",
        },
        {
          index: 1992,
          address: "EQBPMnW_zZ2NDkTrP-CDOOjZn8pWPeli17txb2skQkm8L7pi",
          deploymentStatus: "completed",
        },
        {
          index: 1993,
          address: "EQAINN5-LPGKtMybQf_qJJSe4Q-uPjD801l1QZ9oIXpaMjMn",
          deploymentStatus: "completed",
        },
        {
          index: 1994,
          address: "EQCe4QtO7WoUkcRc-714BDMRxeOkFYU6F2nNnBCiFiprsweI",
          deploymentStatus: "pending",
        },
        {
          index: 1994,
          address: "EQCe4QtO7WoUkcRc-714BDMRxeOkFYU6F2nNnBCiFiprsweI",
          deploymentStatus: "completed",
        },
        {
          index: 1995,
          address: "EQDesXdgoYfrbyJQKfTH31FwPvDbDaC-5slDXXOtQI0mnzf4",
          deploymentStatus: "completed",
        },
        {
          index: 1996,
          address: "EQA7Bv8H3bPzD4R1NuUuVlRaFKimRp3oBFY3nHlLQow6f3LG",
          deploymentStatus: "completed",
        },
        {
          index: 1997,
          address: "EQDkMNfrsxFmkxF-u3rRG_ehsEU10KdAPl1z6enXgvMzfuPO",
          deploymentStatus: "completed",
        },
        {
          index: 1998,
          address: "EQBiHn5r9DgymKxXh2qbY5XKwABmSNCkJNuP-_EA89kIISB3",
          deploymentStatus: "completed",
        },
        {
          index: 1999,
          address: "EQBXS9Gkftu8Fd-6IqWvbUASTGzIHWlQ0PzejibLQVuhhzyY",
          deploymentStatus: "completed",
        },
      ],
    },
  ],
}

const nameToMetadataMap = {
    "Pancat": "0.json",
    "Meowmen": "1.json",
    "Lazyfield": "2.json",
    "Catpool": "4.json",
    "Meowki": "5.json",
    "Laserneko": "6.json",
    "Saberra": "7.json",
    "Bunnymeow": "8.json",
    "Goldpaw": "9.json",
    "Rockneko": "10.json",
    "Meowstronaut": "11.json",
    "Nightpaw": "12.json",
    "Nephritus": "13.json",
    "Assassipaw": "14.json",
    "Meowroe": "15.json",
    "Magmocat": "16.json",
    "Mandalpurr": "17.json",
    "Starglem": "19.json",
    "Xpaw": "20.json",
    "Yaku-cat": "21.json",
    "Steelwhisker": "22.json",
    "Guitarcat": "23.json",
    "Roastie": "24.json",
    "Bonefish": "25.json",
    "Parisianpaw": "26.json",
    "Catarachnid": "27.json",
    "Coffeecat": "28.json",
    "Venocat": "29.json",
    "Meowhale": "30.json",
    "Purrfect Launch": "31.json"
  };
  
  export async function populateDB() {
    try {
      await mongoose.syncIndexes()
      console.log("Connected to MongoDB");
      
      const anyItems = await NFTItems.countDocuments()
      await NFTItems.deleteMany({});
      console.log("Cleared existing NFTItems");
  
      const nftItemsToInsert = [];
      const nftShelfItems = ShelfItems.filter(item => item.id >= 9 && item.id <= 38);
  
      for (const item of nftShelfItems) {
        const metadataFile = nameToMetadataMap[item.name.en];
        const deploymentItem = deploymentInfo.nftItems.find(nft => nft.metadataFile === metadataFile);
  
        if (!deploymentItem) {
          console.warn(`No deployment data found for ${item.name.en} (ID: ${item.id})`);
          continue;
        }
  
        const price = item.cost.ton_price || 1.0; // Default to 1 TON if not specified
        deploymentItem.copies.forEach(copy => {
          if(copy.deploymentStatus === 'completed') {
            nftItemsToInsert.push({
              itemId: item.id,
              index: copy.index,
              address: copy.address,
              status: "available",
              memo: null,
              lockedAt: null,
              owner: null,
              price: item.ton_price
            });
          }
        });
      }
  
      async function insertInBatches(items, batchSize = 50, delayMs = 500) {
        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          await NFTItems.insertMany(batch);
          if (i + batchSize < items.length) await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
      
      // Usage
      await insertInBatches(nftItemsToInsert);
      console.log("Database populated successfully with", nftItemsToInsert.length, "atomic NFTs");
    } catch (error) {
      console.error("Error populating database:", error);
    } finally {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    }
  }
  
  populateDB();