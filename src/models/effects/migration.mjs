import { duration } from "moment-timezone";
import { ConstantEffectTypes } from "./constantEffectsLevels.mjs";

export default [
    {
        id: 1,
        level: 1,
        price: 100,
        type: ConstantEffectTypes.WorkDurationDecrease,
        value_change: 1,
        name: {
            ru: 'Ускорение работы на 1%',
            en: 'Work duration decreased by 1%'
        },
        description: {
            ru: 'Ускорение работы на 1%',
            en: 'Work duration decreased by 1%'
        },
        link: '',
        required_level: 1,
        duration: 1
    },
    {
        id: 2,
        level: 1,
        price: 100,
        type: ConstantEffectTypes.TrainingDurationDecrease,
        value_change: 1,
        name: {
            ru: 'Ускорение тренировки на 1%',
            en: 'Training duration decreased by 1%'
        },
        description: {
            ru: 'Ускорение тренировки на 1%',
            en: 'Training duration decreased by 1%'
        },
        link: '',
        required_level: 1,
        duration: 1,
    },
    {
        id: 3,
        level: 1,
        price: 100,
        type: ConstantEffectTypes.SleepingDurationDecrease,
        value_change: 1,
        name: {
            ru: 'Ускорение сна на 1%',
            en: 'Sleep duration decreased by 1%'
        },
        description: {
            ru: 'Ускорение сна на 1%',
            en: 'Sleep duration decreased by 1%'
        },
        link: '',
        required_level: 1,
        duration: 1
    },
    {
        id: 4,
        level: 1,
        price: 100,
        type: ConstantEffectTypes.WorkHourlyIncomeIncrease,
        value_change: 1,
        name: {
            ru: 'Увеличение дохода работы на 1 в час',
            en: 'Work income increased by 1 per hour'
        },
        description: {
            ru: 'Увеличение дохода работы на 1%',
            en: 'Work income increased by 1%'
        },
        link: '',
        required_level: 1,
        duration: 1
    },
]