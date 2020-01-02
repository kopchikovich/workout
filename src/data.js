import React from 'react'

class Training {
    constructor(key, name, description, type, exercises) {
        this.key = key;                 // string (repeat object key)
        this.name = name;               // string
        this.description = description; // string
        this.type = type;               // string
        this.exercises = exercises;     // array of objects
    }
}

class Exercise {
    constructor(name, description, muscle, sets, options) {
        this.name = name;               // string
        this.description = description; // string
        this.muscle = muscle;           // array of strings ['biceps', 'back']
        this.sets = sets;               // number
        this.options = options;         // array  of strings ['weight', 'repeats', 'one hand', time', 'distance']
    }
}

const exs = {
    // power
    'pull-ups': new Exercise('Подтягивания', 'Классические подтягивания на перекладине. Хват шире плеч', ['back'], 5, ['weight', 'repeats']),
    'pull-ups negative': new Exercise('Негативные подтягивания на одной руке', 'Одна рука на перекладине, другой придерживаться за что-то для подстаховки когда тянусь в верхнюю точку (можно прыжком). В негативной фазе опускаться на одной руке', ['back', 'biceps'], 1, ['repeats', 'one hand']),
    'pull-ups horizontal': new Exercise('Горизонтальные подтягивания', 'Подтягивания на низкой перекладине с упором ног. Максимально горизонтально. Можно выполнять на кольцах уперев ноги в стену', ['back', 'biceps'], 1, ['repeats']),
    'hanging': new Exercise('Висения на одной руке', 'Висение на каждой руке максимальное время', ['back', 'delta'], 1, ['one hand', 'time']),
    'dumbbell bench stand': new Exercise('Жим гантели стоя', 'Подъёмы гантели над собой отдельно каждой рукой', ['delta'], '3-4-5', ['weight', 'repeats', 'one hand']),
    'dumbbell bench sit': new Exercise('Жим гантели сидя', 'Жим гантели сидя над собой. Можно выполнять жим Арнольда', ['delta'], 2, ['weight', 'repeats', 'one hand']),
    'dumbbell leading': new Exercise('Отведение гантели в сторону', 'Отведение гантели в сторону в наклоне. Целевая мышца - средний пучок дельтовидной. Не заморачиваться с выбором каким пальцем тянуть вверх', ['delta'], 3, ['weight', 'repeats', 'one hand']),
    'traction rubber': new Exercise('Тяга резины к себе сверху', 'Резина на турнике. Локни не сгибать, тянуть задней дельтой', ['delta', 'back'], 1, ['repeats']),
    'crossover with rubber': new Exercise('Кроссовер с резиной', 'Резина на ручках брусьев. Сводить руки перед собой как в кроссовере', ['chest'], 1, ['repeats']),
    'bars': new Exercise('Отжимания на брусьях', 'Отжимания от брусьев на грудные мышцы, т.е. немного наклонившись вперёд, ноги назад не отводить', ['chest', 'triceps'], '3-4-5', ['weight', 'repeats']),
    'push-ups': new Exercise('Отжимания от пола', 'Классические отжимания от пола или от упоров. Для дополнительной нагрузки использовать резину', ['chest', 'triceps'], 3, ['repeats']),
    'push-ups archer': new Exercise('Отжимания "Лучник"', 'Поочередно отжиматься на одной руке. Вторая рука ровная, не сгибать', ['chest', 'triceps'], 1, ['repeats', 'one hand']),
    'push-ups legs up': new Exercise('Отжимания с высокой постановкой ног', 'Подготовительное упражнение к отжиманиям в стойке на руках. Ноги упираются в стену для равновесия, либо ставятся на поверхность выше пола (диван). Целевые мышцы - дельтавидные', ['delta'], 5, ['repeats']),
    'push-ups slow': new Exercise('Медленные подконтрольные отжимания', 'Вниз опускаться медленно не менее 4 секунд, вверх - взрыв 1 секунда', ['chest', 'triceps'], 5, ['repeats']),
    'push-ups diamond': new Exercise('Бриллиантовые отжимания', 'Руки складываются треугольником. При отжимании касаться нижней частью груди', ['triceps', 'chest'], 2, ['repeats']),
    'explosive ngtv push-ups': new Exercise('Взрывные негативные отжимания от пола', 'Отжимания с резким толчком вверх (прыжок), затем мягкое приземление и медленная негативная фаза', ['chest', 'triceps'], 1, ['repeats']),
    'corner': new Exercise('Удержание уголка', 'Удержание прямых ног на максимальное время вися на перекладине', ['press'], 1, ['time']),
    'press': new Exercise('Подъём колен к груди на перекладине', 'Для усложнения можно поднимать ноги в уголок, затем поднимать ноги к перекладине', ['press'], 3, ['repeats']),
    'strap': new Exercise('Планка', 'Классическая планка на локтях и носках на максимальное время', ['press'], 1, ['time']),
    'scapula': new Exercise('Сведение лопаток в висе', 'Сведение лопаток вместе в висе на турнике и удержание такого положения 15 секунд. Упражнение для переднего виса', ['back', 'delta'], '15 секунд', ['time']),
    'scapula pull down': new Exercise('Тяга вниз лопатками', 'Удержание тяги вниз лопатками в висе на турнике 10 секунд. Упражнение для переднего виса. Свести лопатки, откинуть голову назад, грудь и живот вверх', ['back', 'delta', 'press'], '10 секунд', ['time']),
    'front hanging': new Exercise('Передний вис', 'Удержание переднего виса', ['back', 'delta', 'press'], 'долго', ['time']),
    'front hanging with knees': new Exercise('Передний вис с поднятыми коленями', 'Удержание передннего виса с поднятыми коленями 8 секунд. Упражнение для переднего виса. Взгляд ровно вверх, лопатки сводим, тяга вниз, колени вверх', ['back', 'delta', 'press'], '8 секунд', ['time']),
    'muscle-up': new Exercise('Выходы силой', 'Выходы силой на 2 руки, вниз опускаться как удобно, добивать можно выходами на одну руку', ['all'], 5, ['repeats']),
    'horizontal bar push-ups': new Exercise('Отжимания на турнике', 'Ширина хвата рук должна быть шире плеч, при отжимании касаться перекладины нижней частью грудной клетки (верхним брюшным отделом), руки в нижней позиции должны быть согнуты в локтях не более, чем на 90 градусов, в верхней позиции не допускать полного разгибания рук в локтях', ['all'], 5, ['repeats']),
    // swimming
    'swimming': new Exercise('Плавание', 'Медленное плавание, можно несколько ускорений. В целом любое плавание, главное нагрузка и продолжительность', ['all'], 1, ['time', 'distance']),
    // running
    'run slow': new Exercise('Восстановительный бег', 'Медленный бег (действительно медленный, как по правилу 80/20), можно с музыкой. Пульс не поднимать до анаэробной нагрузки (выше 156 ударов). Если повысился, перейти ненадолго на шаг', ['legs'], 1, ['time', 'distance']),
    'run interval': new Exercise('Интервальный бег', 'Бег на скорость интервалы 400м/800м/1200м. После ускорения круг отдыха (медленный бег с переходом на шаг, если совсем тяжело)', ['legs'], 5, ['time', 'distance']),
    'run tempo cross': new Exercise('Темповой кросс', 'Темповой бег на скорость. Минимум 4км', ['legs'], 1, ['time', 'distance']),
    'run 10x10': new Exercise('Тренировка 10х10', (<><p className='margin-top-10'>Разминка:</p><p>- Медленный бег 10-15 мин</p><p className='margin-top-10'>Тренировка 10х10:</p><p>- Тренировка высокого старта (старт и ускорение на 10 метров) 5 раз</p><p>- Медленный бег с правильными резкими разворотами 5м</p><p>- 4 по 10м полноценные - 3-4 серии</p><p>- Бег 5-10-15 метров 2 серии</p><p>- Бег 10м с переносом 3 теннисных шаров (камней)</p><p>- Финишный старт: 20 секунд бег на месте с высоким пониманием ног, затем рывок на 10 метров (товарищ удерживает на поясе эспандером)</p><p>- Прыжки на скакалке 20с затем ускорение</p><p className='margin-top-10'>Заминка:</p><p>- Бёрпи (упор присев -> упор лёжа ->  упор присев -> выпрыгивание (руки вверх) -> повторить) 10-15 раз</p><p>- Прыжки на скакалке 2-3 минуты</p><p>- Зашагивание на тумбу (ногу на упор второй «зашагиваю в воздух» - вынос бедра) по 10 раз на ногу</p><p>- Прыжки на тумбу (пониже прошлой) на одной ноге по 15 раз, затем 15 раз на 2 ноги</p><p>- Ускорения на участке 60м в среднем темпе</p></>), ['legs'], 1, ['time'])
};

const training_db = {
    // power
    'Back and delta': new Training('Back and delta', 'Спина, плечи', 'Цель тренировки научиться подтягиваться на 1 руке и развить дельтавидные мышцы. В жиме гантели стоя увеличить количество подходов по неделям 3-4-5, затем возвращаться на 3 подхода, но увеличить вес', 'power',
        [exs['pull-ups'],
        exs['hanging'],
        exs['pull-ups negative'],
        exs['dumbbell bench stand'],
        exs['dumbbell leading'],
        exs['traction rubber'],
        exs['pull-ups horizontal']]),
    'Chest and press': new Training('Chest and press', 'Грудь, пресс', 'Цель тренировки - развитие грудных, трицепса и пресса. Увеличить количество подходов в отжимания на брусьях по неделям 3-4-5, затем возвращаться и увеличивать вес', 'power',
        [exs['push-ups'],
        exs['push-ups archer'],
        exs['explosive ngtv push-ups'],
        exs['bars'],
        exs['crossover with rubber'],
        exs['scapula'],
        exs['scapula pull down'],
        exs['front hanging with knees'],
        exs['corner'],
        exs['strap']]),
    'Delta and chest': new Training('Delta and chest', 'Плечи, грудь', 'Короткая тренировка сфокусированная на остающих мышцах: дельтавидных и грудных', 'power',
        [exs['push-ups legs up'],
        exs['dumbbell bench sit'],
        exs['push-ups slow'],
        exs['push-ups diamond']]),
    'Muscle-up': new Training('Muscle-up', 'Выходы силой', 'Короткая тренировка направленная на проработку выходов силой', 'power',
        [exs['pull-ups'],
        exs['muscle-up'],
        exs['horizontal bar push-ups']]),
    // swimming
    'Swimming': new Training('Swimming', 'Плавание', 'Плавание в бассейне для удовольствия и восстановления', 'swimming', [exs['swimming']]),
    // running
    'Recovery run': new Training('Recovery run', 'Восстановительный бег', 'Медленный бег для удовольствия и восстановления', 'running', [exs['run slow']]),
    'Interval run': new Training('Interval run', 'Интервальный бег', 'Тренировка для развития скоростной выносливости и финиширования', 'running', [exs['run interval']]),
    'Tempo cross run': new Training('Tempo cross run', 'Темповой кросс', 'Тренировка на общую скоростную выносливость', 'running', [exs['run tempo cross']]),
    'Training 10x10': new Training('Training 10x10', 'Тренировка 10х10', 'Упражнения на улучшение результатов в 10х10', 'running', [exs['run 10x10']])
}

export default training_db;