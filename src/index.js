/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// alert();
// https://www.imdb.com/name/nm2032150/bio

// Error
// https://www.imdb.com/name/nm1812523/mediaviewer/rm2713100033/?ref_=nm_md_4

const INFO_TEMPLATE = 'include: info.html';

function createHTMLDoc(text) {
  const parser = new DOMParser();
  return parser.parseFromString(text, 'text/html');
}

function createHTMLElement(innerHTML) {
  const div = document.createElement('div');
  div.innerHTML = innerHTML.trim();
  // @ts-ignore
  return div.firstChild;
}

function getAge(birthDate) {
  return Math.floor((+new Date() - +new Date(birthDate)) / 31536000000);
}

function getMonthAndDay(birthDate) {
  // console.log(birthDate);
  // console.log(birthDate.getMonth() + 1);
  // console.log(birthDate.getDate());

  // const [, month, day] = birthDate.split('-').map((string) => Number(string));
  return [birthDate.getMonth() + 1, birthDate.getDate()];
}

// https://www.imdb.com/name/nm0000008/?ref_=tt_cl_t_1
// https://www.imdb.com/name/nm0549134/bio?ref_=nm_ov_bio_sm
// https://www.imdb.com/name/nm0001820/?ref_=tt_cl_i_11
// https://www.imdb.com/title/tt0068646/?ref_=nm_knf_t_1
// https://www.imdb.com/name/nm0001820/?ref_=tt_cl_i_11

// https://www.imdb.com/name/nm2032150/?ref_=nmbio_bio_nm
// https://www.imdb.com/name/nm0000008/?ref_=tt_cl_t_1
// https://www.imdb.com/name/nm0001820/?ref_=tt_cl_i_11
// https://www.imdb.com/name/nm0401264/?ref_=tt_cl_t_3
// https://greasyfork.org/en/scripts/445300-was-about-that-old-in-that-movie/code

function verifyDate(date) {
  if (!/^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(date)) {
    throw new Error('Not a valid date');
  }
}

function extractDate(element) {
  // console.log(element.firstElementChild);
  const date =
    element.lastElementChild.firstElementChild.firstElementChild.textContent;
  console.log(date);
  verifyDate(date);
  return [new Date(date), date];
}

// function extractTextDate(element) {
//   const dateText = element.firstElementChild.textContent;
//   return dateText.trim().replace(/\s+/g, ' ');
// }

function extractPlace(element) {
  // if (element.firstElementChild === element.lastElementChild) {
  //   return null;
  // }
  return element.lastElementChild.firstElementChild.lastElementChild
    .firstElementChild.textContent;
}

async function getBioPage(actorID) {
  const response = await fetch(`https://www.imdb.com/name/${actorID}/bio`);
  const responseText = await response.text();
  return createHTMLDoc(responseText);
}

const DEATH_INFO_SELECTOR =
  'section.ipc-page-section.ipc-page-section--base > div > ul > li:nth-child(2) > span';

function isActorDead(element) {
  // console.log(element.querySelector(DEATH_INFO_SELECTOR).textContent);
  return element.querySelector(DEATH_INFO_SELECTOR).textContent === 'Died';
}

async function getActorInfo() {
  // const documentX = await getBioPage(actorID);

  // const infoSelector = '#overviewTable > tbody';
  // const infoSelector = 'section.ipc-page-section.ipc-page-section--base';

  // const infoElementX = documentX.querySelector(infoSelector);
  // console.log({ infoEl: infoElementX });

  //
  // const isDeadActor = isActorDead(documentX);
  // if (isDeadActor) {
  //   // alert(isDeadActor);
  // }

  // console.log({ isDeadActor });

  const BIRTH_INFO_SELECTOR =
    'section[data-testid="PersonalDetails"] ul > li:nth-child(3)';

  const info = {};
  const infoElement = document.querySelector(BIRTH_INFO_SELECTOR);
  if (infoElement.firstElementChild.textContent !== 'Born') {
    alert('No valid date present');
    return;
  }

  // console.log(infoElement);
  try {
    const [birthDate, birthDateText] = extractDate(infoElement);
    info.birthDate = birthDate;

    info.birthDateText = birthDateText;

    info.birthPlace = extractPlace(infoElement);
    console.log(info);
    // return;

    const dead = Math.random() < 0.5;
    if (dead) {
      //
    }
  } catch (err) {
    alert(err);
    throw new Error(err);
    // throw new Error("couldn't resolve actor info");
  }

  return info;
}

function getActorID(actorURL) {
  return actorURL.match(/name\/([^/]+)\//)[1];
}

function removeDefaultOnes() {
  const selector = '[data-testid^="birth-and-death"]';
  const elements = document.querySelectorAll(selector);
  for (const element of elements) {
    element.remove();
  }
}

function resolveContainer() {
  const heroEl = document.querySelector('[data-testid="hero__pageTitle"]');
  const sectionEl = heroEl.closest('section');
  const containerEl = sectionEl.querySelector('ul.ipc-metadata-list');
  if (containerEl) {
    containerEl.innerHTML = '';
    removeDefaultOnes();
    return containerEl;
  }

  // Usual sibling element to container
  const siblingEl = sectionEl.querySelector('section > aside:nth-child(2)');
  const newContainerEl = createHTMLElement('include: container.html');
  siblingEl.parentElement.append(newContainerEl);
  removeDefaultOnes();
  return newContainerEl;
}

// eslint-disable-next-line no-unused-vars
function addIsDeadStyle() {
  // Hide sign from death info
  // Cross age in born info
  // Color death info with crimson
}

async function main() {
  // const actorID = getActorID(window.location.href);
  const {
    birthDate,
    birthDateText,
    birthPlace,
    // dead,
    // deathDate,
    // deathDateText,
    // deathPlace,
  } = await getActorInfo();
  const age = getAge(birthDate);
  console.log({ age });

  const zodiacSign = getZodiacSign(birthDate);
  console.log({ birthDateText, age, zodiacSign, birthPlace });

  let bornElemText = INFO_TEMPLATE;
  bornElemText = bornElemText.replace('{label}', 'Born');
  bornElemText = bornElemText.replace('{date}', birthDateText);
  bornElemText = bornElemText.replace('{age}', `${age.toString()} years old`);
  bornElemText = bornElemText.replace('{sign}', zodiacSign);
  bornElemText = bornElemText.replace('{place}', birthPlace);
  // const bornElem = createHTMLElement(bornElemText);

  // if (birthPlace) {
  // const birthPlaceElem = ITEM_TEMPLATE.replace('{value}', birthPlace);
  // const bornElemList = bornElem.querySelector('ul');
  // if (bornElemList)
  //   bornElemList.insertAdjacentHTML('beforeend', birthPlaceElem);
  // console.log(birthPlaceElem);
  // }

  // const parent = document.querySelector('ul.ipc-metadata-list');
  // resolveContainer().prepend(bornElem);
  resolveContainer().insertAdjacentHTML('afterbegin', bornElemText);

  // parent.insertAdjacentHTML('afterbegin', bornElemText);
}

main();

function getZodiacSign(birthDate) {
  const [month, day] = getMonthAndDay(birthDate);

  let sign;
  // eslint-disable-next-line default-case
  switch (true) {
    case (month === 3 && day >= 21) || (month === 4 && day <= 19):
      sign = 'Aries';
      break;
    case (month === 4 && day >= 20) || (month === 5 && day <= 20):
      sign = 'Taurus';
      break;
    case (month === 5 && day >= 21) || (month === 6 && day <= 20):
      sign = 'Gemini';
      break;
    case (month === 6 && day >= 21) || (month === 7 && day <= 22):
      sign = 'Cancer';
      break;
    case (month === 7 && day >= 23) || (month === 8 && day <= 22):
      sign = 'Leo';
      break;
    case (month === 8 && day >= 23) || (month === 9 && day <= 22):
      sign = 'Virgo';
      break;
    case (month === 9 && day >= 23) || (month === 10 && day <= 22):
      sign = 'Libra';
      break;
    case (month === 10 && day >= 23) || (month === 11 && day <= 21):
      sign = 'Scorpio';
      break;
    case (month === 11 && day >= 22) || (month === 12 && day <= 21):
      sign = 'Sagittarius';
      break;
    case (month === 12 && day >= 22) || (month === 1 && day <= 19):
      sign = 'Capricorn';
      break;
    case (month === 1 && day >= 20) || (month === 2 && day <= 18):
      sign = 'Aquarius';
      break;
    case (month === 2 && day >= 19) || (month === 3 && day <= 20):
      sign = 'Pisces';
      break;
  }

  return sign;
}
