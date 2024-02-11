import React from 'react'

export const SettingsPage = () => {
  return (
    <div className="wrapper_page">
        <button className="help_button btn_red title">?</button>
        <div className="left_side">
            <div className="tabs">
                <button className="title tab btn_black" id="btn_words">Слова</button>
                <button className="title tab btn_black" id="btn_domens">Домены</button>
                <button className="title tab btn_black" id="btn_wish">Отложенные</button>
            </div>
            <div className="wrapper_content">
                <div className="add_word_section">
                    <input id='word_input' className="input_page main-text" placeholder="Введите слово или фразу"></input>
                    <select id='category_input'  className="dropdown_page main-text">
                        <option value=""  selected>Категория</option>
                        <option value="Фильмы">Фильмы</option> 
                        <option value="Игры">Игры</option> 
                        <option value="Новости">Новости</option> 
                        <option value="Люди">Люди</option>
                        <option value="Добавить категорию">
                            <button>Добавить категорию</button>
                        </option>
                        
                    </select>
                    <button id='add_new_word' className="button-text add_button_page btn_red">Добавить</button>
                    <button id='clear_all' className="button-text add_button_page btn_red">Удалить все</button>
                </div>
                <div className="list_section">
                    <div className="list_start_line">
                        <div className="list_title subtitle">Весь список</div>
                        <select name="" id="" className="select_dropdown mark">
                            <option value="films">По дате добавления</option> 
                            <option value="games">По алфавиту</option> 
                        </select>
                    </div>
                    <div className="list_header">
                        <div className="word mark">Слово</div>
                        <div className="category mark">Категория</div>
                    </div>
                    <div id='list' className="list">
                        <div className="item">
                            <div className="item_word main-text">Звездные войны</div>
                            <div className="item_category main-text">Фильмы</div>
                            <div className="actions">
                                <object data="/Icons/Edit.svg" alt="edit"></object>
                                <object data="/Icons/Trash.svg" alt="delete"></object>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
           
        </div>
    
        <div className="right_side">
            <div className="title Title">Внешний вид</div>
            <div className="preview"></div>
            <div className="levers">
                <div className="blur_degree">
                    <div className="name mark">Степень размытия</div>
                    <input className="slider" type="range" value="50" min="0" max="100"/>
                    {/* <output className="output" name="output" for="range">
                        50
                      </output>  */}
                </div>
                <div className="blur_color">
                    <div className="name mark">Цвет размытия</div>
                    <div className="color_window"></div>
                </div>
                <div className="additional_effects">
                    <div className="name mark">Дополнительные эффекты</div>
                    <div className="effects_wrapper">
                        <button className="effect"></button>
                        <button className="effect"></button>
                        <button className="effect"></button>
                        <button className="effect"></button>
                        <button className="effect"></button>
                        <button className="effect"></button>
                        <button className="effect"></button>
                    </div>
                </div>
                <div className="effects_color">
                    <div className="name mark">Цвет эффекта</div>
                    <div className="color_window"></div>
                </div>
                <div className="hover_behavior">
                    <div className="name mark">Поведение при наведении</div>
                    <div className="behavior_wrapper">
                        <button className="behavior btn_black">Нет</button>
                        <button className="behavior btn_black">Размытие</button>
                        <button className="behavior btn_black">Зум</button>
                        <button className="behavior btn_black">Размытие</button>
                        <button className="behavior btn_black">Зум</button>
                    </div>
                </div>
                <div className="show_options">
                    <div className="show_word">
                        <div className="name mark">Показать слово</div>
                        <div className="show_toggle" id="show_toggle">
                            <input type="checkbox"/>
                            <span></span>
                        </div>
                    </div>
                    <div className="show_category">
                        <div className="name mark">Показать категорию</div>
                        <div className="show_toggle" id="show_toggle">
                            <input type="checkbox"/>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
