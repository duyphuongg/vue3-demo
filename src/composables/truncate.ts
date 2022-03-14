export const handleAddShowMoreContent = (class_truncate, name_val_content_input, class_icon_show_more) => {
  let review_rows = document.querySelectorAll(`.${class_truncate}`);
  console.log('review_rows', review_rows);
  if (review_rows.length) {
    Array.from(review_rows).forEach(function (el_content: any) {
      let content =
        el_content.querySelector(`input[name=${name_val_content_input}]`) &&
        el_content.querySelector(`input[name=${name_val_content_input}]`).value;
      console.log('content', content);
      console.log('el_content', el_content);
      let style = getComputedStyle(el_content);
      let maxHeight: any = style['maxHeight'];
      if (maxHeight) {
        maxHeight = maxHeight.replace(/(px)|(PX)/gi, '');
        maxHeight = parseInt(maxHeight);
      } else {
        maxHeight = null;
      }
      let scrollHeight = el_content.scrollHeight;
      console.log('max_height_content', maxHeight);
      console.log('scrollHeight', scrollHeight);
      if (content.length > 0 && maxHeight && el_content.scrollHeight > maxHeight) {
        let wordArray = content.split(' ');
        let inner_wordArray = [];
        if (wordArray.length > 0) {
          handleHeightTrunCateTextOver(wordArray, inner_wordArray, el_content, class_icon_show_more);
          while (el_content.scrollHeight <= maxHeight) {
            handleHeightTrunCateTextOver(wordArray, inner_wordArray, el_content, class_icon_show_more);
          }
          if (el_content.scrollHeight > maxHeight) {
            let last_word: any = inner_wordArray.pop();
            let last_chart = [];
            last_chart = last_word.split('');
            while (el_content.scrollHeight > maxHeight) {
              last_chart.pop();
              if (last_chart.length == 0) {
                el_content.innerHTML =
                  inner_wordArray.join(' ') +
                  `... <a class="${class_icon_show_more} body-small leading-[15px] text-info-3 hover:cursor-pointer hover:underline">Show more</a>`;
                return;
              }
              let _wordArray = [...inner_wordArray, last_chart.join('')];
              el_content.innerHTML =
                _wordArray.join(' ') +
                `... <a class="${class_icon_show_more} body-small leading-[15px] text-info-3 hover:cursor-pointer hover:underline">Show more</a>`;
            }
          }

          const button_show_more = el_content.querySelector(`.${class_icon_show_more}`);
          button_show_more.addEventListener('click', function () {
            el_content.innerHTML = content;
            el_content.classList.remove('overflow-hidden');
            el_content.style.maxHeight = 'unset';
          });
        }
      }
    });
  }
};

const handleHeightTrunCateTextOver = (wordArray, inner_wordArray, el_text, class_icon_show_more) => {
  inner_wordArray.push(wordArray[0]);
  wordArray.shift();
  el_text.innerHTML =
    inner_wordArray.join(' ') +
    `... <a class="${class_icon_show_more} body-small leading-[15px] text-info-3 hover:cursor-pointer hover:underline">Show more</a>`;
};
