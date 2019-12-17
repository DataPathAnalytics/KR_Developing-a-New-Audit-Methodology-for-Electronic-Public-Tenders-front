import React, { Component } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { changeNavigationItem, setBreadCrumbsOptions } from '../../redux/action/navigation/NavigationActions'
import { withTranslate } from 'react-redux-multilingual'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Drawer, Button, Icon } from 'antd'
import { USER_MANUAL_MENU } from './DocumentationConstants'

import './HelpUserManuals.css'

class HelpUserManuals extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false, placement: 'right',
    }

    props.changeNavigationItem(props.menuKey.key)
    props.setBreadCrumbsOptions(props.menuKey.breadcrumb)
  }

  componentDidMount() {
    // setBreadCrumbsOptions
    window.scrollTo(0, 0)
  }

  scrollToMyRef = (refName) => {
    window.scrollTo({
      top: this.refs[refName].offsetTop,
      behavior: 'smooth',
    })
  }

  showDrawer = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onChange = e => {
    this.setState({
      placement: e.target.value,
    })
  }

  prepareMenuItem = (menuItemData, index) => {
    return (
      <div className={menuItemData.className} key={`menu_item_${index}`}>
        <p onClick={() => this.scrollToMyRef(menuItemData.refKey)}>{menuItemData.menuTitle}</p>
        {!_.isEmpty(menuItemData.subMenu) && (
          menuItemData.subMenu.map((subMenuItem, ind) => (this.prepareMenuItem(subMenuItem, `${index}_${ind}`)))
        )}
      </div>
    )
  }

  prepareRefMenu = () => {
    return USER_MANUAL_MENU.map((menuItem, index) => (this.prepareMenuItem(menuItem, index)))
  }

  renderManualMenu = () => {
    return (
      <Drawer
        title="Содержание"
        placement={this.state.placement}
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
        width={450}
        // visible={true}
      >
        <div className={classnames('menu-drawer-button-open', !this.state.visible && 'display-none')}>
          <Button type="primary" onClick={this.showDrawer}>
            Содержание
            <Icon type="down" />
          </Button>
        </div>
        {/*<div onClick={() => this.scrollToMyRef('link_1')}>*/}
        {/*<p>Some contents...</p>*/}
        {/*</div>*/}
        {/*<p>Some contents...</p>*/}
        {/*<p>Some contents...</p>*/}
        {this.prepareRefMenu()}
      </Drawer>
    )
  }

  render() {
    return (
      <div className="user-manuals-container">
        <div className={classnames('menu-drawer-button-closed', this.state.visible && 'display-none')}>
          <Button type="primary" onClick={this.showDrawer}>
            Содержание
            <Icon type="up" />
          </Button>
        </div>
        {this.renderManualMenu()}
        <p className="c3">
<span className="c10">
&nbsp;</span>
          <span className="c8" ref="link_1">
1.</span>
          <span className="c19">
&nbsp;&nbsp;</span>
          <span className="c23 c8">
КОМПОНЕНТЫ АНАЛИТИЧЕСКОГО ПРИЛОЖЕНИЯ</span>
        </p>
        <p className="c3">
<span className="c1">
&nbsp;</span>
        </p>
        <p className="c3">
<span className="c1 c36 information-span" ref="link_1_1">
Аналитическое приложение построено на основе следующих основных принципов:</span>
        </p>
        <ul className="c21 lst-kix_ywm5f6cz7q5v-0 start">
          <li className="c3 c30 display-inline-flex-li">
<span className="c1 pl-5">
модульность: декомпозиция на функциональные модули с возможностью параллельной последующей разработки, внедрения и обслуживания отдельных компонентов;</span>
          </li>
          <li className="c3 c30 display-inline-flex-li">
            <span className="c1 pl-5">
открытость: использование открытых данных и принципов построения (в том числе реализована возможность дальнейшей модификации и наращивания дополнительными модулями);</span>
          </li>
          <li className="c3 c30 display-inline-flex-li">
<span className="c1 pl-5">
защита от несанкционированного доступа: решение обеспечивает разграничение прав доступа пользователей к функциям и данным,</span>
          </li>
          <li className="c3 c30 display-inline-flex-li">
<span className="c1 pl-5">
наличие средств информационного взаимодействия с внешними источниками и получателями информации на основе открытых программных интерфейсов.</span>
          </li>
        </ul>

        <p className="c3">
<span className="c1">
&nbsp;</span>
        </p>
        <p className="c3">
<span className="c1 c36 information-span" ref="link_1_2">
Аналитическое приложение состоит из следующих функциональных модулей:</span>
        </p>
        <div className="information-block">
          <div className="information-block-header">
            <p className="c3">
              <span className="c10 c47">1)&nbsp;&nbsp;Модуль расчета автоматических индикаторов риска</span>
            </p>
            <p className="c3">
<span className="c1">
&nbsp;</span>
            </p>
          </div>
          <div className="information-block-content">
            <p className="c3">
<span className="c1">
Основной принцип: автоматическое выявление рисков путем применения алгоритмов анализа исторических данных транзакций электронных закупок путем моделирования сценария набора данных и их взаимосвязей, которые характеризуются как нормальный сценарий и сценарий с риском. &nbsp; </span>
            </p>
            <p className="c3">
<span className="c1">
&nbsp;</span>
            </p>
            <p className="c3">
<span className="c1">
Преимущества автоматического выявления риска:</span>
            </p>
            <ul className="c21 lst-kix_cog9csbtc1k3-0 start">
              <li className="c3 c30 display-inline-flex-li">
<span className="c1 pl-5">
Точность: оптимальное и независимое определение конкурсов с риском за счет использования передовых технических средств и понятных методологий;</span>
              </li>
              <li className="c3 c30 display-inline-flex-li">
<span className="c1 pl-5">
Скорость реакции: весь массив пересчета обновляется автоматически с периодичностью не реже одного раза в 24 часа и охватывает все доступные данные в системе на момент пересчета, при необходимости периодичность пересчета может быть увеличена;</span>
              </li>
              <li className="c3 c30 display-inline-flex-li">
<span className="c1 pl-5">
Непротиворечивость: каждая транзакция закупки, анализируется набором свойственных ей алгоритмов, соответственно, характеризуется присущими только ей рисками в случае позитивного срабатывания алгоритма. &nbsp;</span>
              </li>
            </ul>
            <p className="c3">
<span className="c1">
&nbsp;</span>
            </p>
            <p className="c3">
<span className="c1">
На основе накопленной статистики о сработанных автоматических индикаторах риска аналитическая система автоматически генерирует информацию об уровне риска каждого конкурса и, соответственно, уровня риска существующей практики закупающей организации. Таким образом, уровень риска является понятным и интерпретируемым с содержательной точки зрения, и более точным, что позволяет минимизировать вероятность «ложной тревоги» при выявлении плохой практики в госзакупках.</span>
            </p>
            <p className="c3">
<span className="c1">
&nbsp;</span>
            </p>
            <p className="c3">
<span className="c1">
Система анализирует все нарушения путем применения доступных автоматических индикаторов риска, позволяющий наиболее эффективно выделить наиболее рискованные конкурсы и практики в госзакупках. После нахождения всех позитивных индикаторов система суммирует уровни риска каждого индикатора и выводит суммарный риск конкурса.</span>
            </p>
            <span className="c1">
&nbsp;</span>
            <p className="c3">
<span className="c1">
При необходимости и развитии соответствующих методологий, новые автоматические алгоритмы индикаторов риска могут быть с лёгкостью добавлены в данный модуль аналитического приложения.</span>
            </p>
          </div>
          <p className="c3">
<span className="c1">
&nbsp;</span>
          </p>
          <div className="information-block-header">
            <p className="c3">
<span className="c10 c47">
2)&nbsp;&nbsp;Модуль расчета приоритезации конкурсов и закупающих организаций с учётом сработанных автоматических индикаторов риска</span>
            </p>
            <p className="c3">
<span className="c1">
&nbsp;</span>
            </p>
            <div className="information-block-content">
              <p className="c3">
<span className="c1">
Этот модуль извлекает все транзакции конкурсов с риском, которые были определены посредством применения автоматических индикаторов риска, и необходимые дополнительные данные о транзакции или закупающей организации и выполняет постановку в очередь по уровню риска (приоритезацию) транзакций с риском и закупающих организаций в соответствии с описанной методологией. &nbsp;Данный модуль так же имеет возможность применять предусмотренные параметры для изменения настроек приоритезации пользователями. Данные, которые этот модуль генерирует передаются в пользовательский интерфейс для анализа и последующей обработки пользователями. </span>
              </p>
            </div>
            <p className="c3">
<span className="c1">
&nbsp;</span>
            </p>

            <p className="c3">
<span className="c10 c47">
3)&nbsp;&nbsp;Модуль контрольных листов со встроенной балловой (скоринговой) методологией для оценки результатов компонентов контрольного листа.</span>
            </p>

            <p className="c3">
<span className="c10 c37 c78">
&nbsp;</span>
            </p>
            <div className="information-block-content">
              <p className="c3">
<span className="c1">
Данный модуль предусматривает хранение и управление автоматизированными контрольными листами, которые предназначены для заполнения в ходе проведения аудита. Модуль хранит в себе основные, утвержденные шаблоны контрольных листов, которые могут использоваться ответственными за аудит. Модуль предоставляет возможность генерировать собственные шаблоны, а также сохранять заполненные в результате отдельных аудитов контрольные листы.</span>
              </p>
              <p className="c3">
<span className="c1">
Контрольные листы имеют встроенный функционал, который отвечает за применение балловой (скоринговой) оценки ответов, полученных в результате обработки каждого элемента контрольного листа. Алгоритм применения балловой (скоринговой) оценки реализован в соответствии с методологией, которая описана ниже в разделе 3 этого приложения.</span>
              </p>
            </div>
          </div>
          <p className="c3">
<span className="c1">
&nbsp;</span>
          </p>
          <p className="c3">
<span className="c10 c47">
4)&nbsp;&nbsp;Пользовательский интерфейс</span>
          </p>
          <p className="c3">
<span className="c23 c8">
&nbsp;</span>
          </p>
          <div className="information-block-content">
            <p className="c3">
<span className="c1">
Веб-интерфейс предназначен для работы конечных пользователей с результатами расчета автоматических индикаторов риска и с контрольными листами. Это веб-страница состоит из различных информационных индикаторов, графиков и табличных данных, которые используют результаты расчета автоматических индикаторов риска и данных транзакций закупок государственных организаций из системы госзакупок в качестве источников данных. Веб страницы включают средства фильтрации для детализации отображаемых данных в соответствии с требованиями конечного пользователя.</span>
            </p>
            <p className="c3">
<span className="c1">
Так же, часть интерфейса позволяем управлять контрольными листами для заполнения при проведении аудиторских мероприятий через кабинет пользователя.</span>
            </p>
          </div>
        </div>
        <p className="c3">
<span className="c1">
&nbsp;</span>
        </p>
        <h1 className="c34" id="h.w51fsz1s8wfy">
<span className="c8" ref="link_2">
2.</span>
          <span className="c19">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="c23 c8">
МЕТОДОЛОГИИ АНАЛИТИЧЕСКОГО ПРИЛОЖЕНИЯ</span>
        </h1>
        <span className="c1 c36 information-span" ref="link_2_1">
Методология расчета автоматических индикаторов риска и «красных флажков» описание внедренных автоматических индикаторов риска в аналитическом приложении.</span>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
    <span className="c1">
    Методология расчета автоматических индикаторов риска строится на базе анализа данных, которые генерируются электронной системой госзакупок в процессе закупочного цикла каждого конкурса.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Закупочная деятельность представляет собой систему, включающую в себя большое количество центральных, управляющих и обеспечивающих процессов, имеющих в качестве основного внешнего входа возникшую у государства или общества потребность в товарах, работах, услугах и основного внешнего выхода – удовлетворенность государства и общества произведенной закупкой, т.е. удовлетворенную потребность.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Риски закупочной деятельности в соответствии с процессным подходом имеют место как в центральных, так и в процессах управления и обеспечения закупочной деятельности организаций. В своей деятельности ответственные за аудит сталкиваются с потребностью оценки различных видов рисков, которые возникают в процессе конкурсов, основными из которых являются коррупционные риски, риски связные с нарушением действующего законодательства и другие риски, которые существенно могут влиять на эффективность и экономичность государственных закупок. </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Разработанные автоматические индикаторы риска и «красные флажки» позволяют ответственным за аудит быстро и точно идентифицировать потенциальные риски, на которые указывают индикаторы в процессе каждого конкурса. Имея полное представление о рисках, на которые указывают автоматические индикаторы или красные флажки, ответственные за аудит имеют возможность более эффективно и качественно делать оценку рисков, планировать и проводить аудиторские мероприятия для проверяемой организации.</span>
          </p>
        </div>
        <p className="c3">
<span className="c15">
&nbsp;</span>
        </p>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Автоматические индикаторы риска и «красные флажки» разработаны для системы государственных закупок КР, представлены в этом руководстве, являют собой автоматические алгоритмы анализа данных процессов электронных конкурсов. Алгоритм представляет собой набор правил, описывающих закономерности в данных транзакции каждого конкурса. В результате работы автоматический алгоритм одновременно выдает результат о проведенном анализе типа:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3 c20">
<span className="c10">
1) Набор правил данных для транзакции другого вида – алгоритм пропускает анализ транзакции этого вида;</span>
          </p>
          <p className="c3 c20">
<span className="c10">
2) Набор правил данных соблюден – </span>
            <span className="c8">
результат положительный</span>
            <span className="c1">
. В этом случае вывод следует что нарушения или вероятность риска не выявлена алгоритмом;</span>
          </p>
          <p className="c3 c20">
<span className="c10">
3) Набор правил данных не соблюден – </span>
            <span className="c8">
результат отрицательный</span>
            <span className="c1">
. В этом случае вывод следует что нарушения или вероятность риска выявлена алгоритмом;</span>
          </p>
          <p className="c3 c20">
<span className="c10">
4) Данные отсутствуют либо повреждены – </span>
            <span className="c8">
результат невозможный</span>
            <span className="c1">
, алгоритм не смог проанализировать транзакцию ввиду неудовлетворительного качества данных транзакции;</span>
          </p>
          <p className="c3 c20">
<span className="c10">
5) Данные ожидаются – результат алгоритм проанализирует транзакцию позже. Алгоритм в режиме ожидания, на события, которые дополнят набор данных для правила алгоритма.</span>
          </p>
          <p className="c3">
<span className="c15">
&nbsp;</span>
          </p>
        </div>
        <p className="c3">
<span className="c8 c36" ref="link_2_2">
Принципы формирования автоматических индикаторов риска и «красных флажков».</span>
        </p>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
На основании открытых данных электронной системы закупок были определены следующие принципы формирования автоматических индикаторов риска и «красных флажков» для аудита госзакупок:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
1)&nbsp;</span>
            <span className="c8">
Принцип процесса</span>
            <span className="c1">
. Разработанный и автоматизированный набор индикаторов риска и «красных флажков» применяется к процессу закупочных конкурсов согласно закону «О государственных закупках» КР. &nbsp;В ходе процесса конкурса набор индикаторов выявляет факторы рисков, которые влияют на законность и эффективность процесса госзакупки.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
2)&nbsp;&nbsp;</span>
            <span className="c8">
Принцип оценки</span>
            <span className="c8 c37">
.</span>
            <span className="c1">
&nbsp;Возможность оценки риска посредством присвоения автоматическим индикаторам риска баллов (условный вес риска). Условный вес каждого автоматического индикатора отражает вероятность наступления риска в случаях наличия условий и степень тяжести возможного общественного вреда правонарушения, на которые указывает индикатор. Принцип оценки и диапазон выбран в соответствии с рекомендациями мировых практик по управлению и оценке рисками (например - The Committee of Sponsoring Organizations of the Treadway Commission, COSO).</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Для оценки рисков и присвоения автоматическим индикаторам условного веса используется приведенная ниже матрица оценки рисков.</span>
          </p>
          <p className="c3">
<span className="c1">
&nbsp;</span>
          </p>
        </div>
        <p className="c3">
<span className="c69 c8 c37">
Таблица 1: Матрица оценки рисков</span>
        </p>
        <p className="c3">
<span className="c1">
&nbsp;</span>
        </p>
        <img style={{ marginLeft: '30px' }} src="/table_1.png" />
        <p className="c3">
<span className="c1">
&nbsp;</span>
        </p>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
По критерию тяжести (влияния) уровень риска неблагоприятных последствий и возможного общественного вреда связанного с потерей ожидаемой пользы от закупки товаров, работ и услуг, направленных на эффективное использование бюджетных средств, оценивается по шкале от «очень высокий» до «очень низкий».</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
По критерию вероятности возникновения риска, о котором свидетельствует автоматический индикатор, оценивается как «очень низкая», когда вероятность его возникновения очень низкая, как «низкая» - вероятность возникновения риска удаленная, как «средняя» - риск может возникнуть при наличии условий, на которые указывает автоматический индикатор риска, как «высокая» - скорее всего риск возникнет чем не возникнет, как «Очень высокая» - риск существует сейчас.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
На начальном этапе реализации проекта условный вес риска предлагается определить экспертным путем. Для этого необходимо создать группу экспертов Счетной Палаты (возможно рассмотреть и другие группы экспертов в госзакупках) и предложить им оценить условный вес риска каждого индикатора с использованием вышеупомянутой матрицы оценки рисков. &nbsp;Предполагается, что такая оценка будет выполняться периодически.</span>
          </p>
        </div>
        <p className="c3">
<span className="c1">
Вышеупомянутый метод не противоречит международным стандартам Аудита и другим практикам, которыми, в своей деятельности, пользуется Счетная Палата при использовании риск ориентированного подхода в аудите госзакупок.</span>
        </p>
        <p className="c3">
<span className="c1">
&nbsp;</span>
        </p>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
3)</span>
            <span className="c19">
&nbsp;</span>
            <span className="c8">
Принцип обоснованности</span>
            <span className="c1">
. Использование индикаторов риска обосновано эмпирически. Несмотря на то, что в процессе оценки рисков госзакупок можно основываться на экспертных знаниях, достоверность их оценок должна быть проверена опытом и реальными результатами аудитов.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
&nbsp;</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
4)</span>
            <span className="c19">
&nbsp;</span>
            <span className="c8">
Принцип значимости.</span>
            <span className="c1">
&nbsp;Значимость автоматических индикаторов риска подтверждается ретроспективно на основании результатов и выводов сделанных ответственными за аудит во время аудиторских мероприятий. Должна быть накоплена информационная база по факторам риска и их последствиям, на основании которых значимость индикаторов риска должна постоянно корректироваться.</span>
          </p>
          <p className="c3">
<span className="c1">
&nbsp;</span>
          </p>

        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
5)</span>
            <span className="c19">
&nbsp;</span>
            <span className="c8">
Принцип воздействия.</span>
            <span className="c1">
&nbsp;Существование возможности воздействия на деятельность закупающей организации. Автоматические индикаторы риска могут использоваться для отслеживания результатов проведенных работ по решению проблем, которые были выявлены во время аудиторских мероприятий.</span>
          </p>
          <p className="c3">
<span className="c1">
&nbsp;</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Индикаторы риска и красные флажки содержат следующую информацию:</span>
          </p>
          <p className="c3">
<span className="c1">
&nbsp;</span>
          </p>
          <p className="c3">
<span className="c10">
1)</span>
            <span className="c19">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="c1">
Название автоматического индикатора риска или красного флажка;</span>
          </p>
          <p className="c3">
<span className="c10">
2)</span>
            <span className="c19">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="c1">
Краткое описание сути индикатора;</span>
          </p>
          <p className="c3">
<span className="c10">
3)</span>
            <span className="c19">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="c1">
Потенциальный риск в процессе госзакупки на который указывает автоматический индикатор;</span>
          </p>
          <p className="c3">
<span className="c10">
4)</span>
            <span className="c19">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="c1">
Нарушение принципа или нормы текущего законодательства;</span>
          </p>
          <p className="c3">
<span className="c10">
5)</span>
            <span className="c19">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="c1">
Методология расчета автоматического индикатора риска содержит следующую информацию:</span>
          </p>
          <ul className="c21 lst-kix_1wg9lk32rzyi-0 start">
            <li className="c3 c30">
            <span className="c1">
Уровень расчета индикатора – конкурс или лот;</span>
            </li>
            <li className="c3 c30">
            <span className="c1">
Источники данных (например API системы государственных закупок в OCDS формате, аналитические таблицы, транзакционные переменные)</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Методы конкурсов, например, метод прямого заключения договора;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Статусы процедур – завершенная, незавершенная, отмененная либо неуспешная;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Частота применения индикатора – один раз либо же многократно при появлении определенных событий;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Поля открытых данных системы госзакупок;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Условия качества данных;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Алгоритм расчета;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Описание факторов, которые могут влиять на чистоту расчетов автоматического индикатора.</span>
            </li>
          </ul>
        </div>
        <p className="c3 c18">
<span className="c10 c39">
<a className="c49"
   href="https://www.google.com/url?q=https://kyrgyzstan-indicators.readthedocs.io/ru/latest/indicators.html&amp;sa=D&amp;ust=1567507327621000">
</a>
</span>
        </p>
        <p className="c3">
<span className="c69 c8 c37">
&nbsp;</span>
        </p>
        <h2 className="c38" id="h.skth1hy1i1ww">
          <span className="c36 c8" ref="link_2_3">Методология приоритезации конкурсов по риску с помощью применения автоматических индикаторов риска</span>
        </h2>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Автоматическое онлайн приложение осуществляет приоритезацию по риску конкурсов со сработавшими автоматическими индикаторами риска и красными флажками с помощью нижеописанной методологии.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Приложение производит приоритезацию конкурсов, на которые, за выбранный период времени, сработал хоть один автоматический индикатор риска или красный флажок, путем построения процедур в упорядоченную очередь.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
С помощью очереди конкурсы с факторами риска и признаками нарушения законодательства выводятся приложением для анализа ответственными за аудит инспекторами. Цель такой "очереди" упорядочить процедуры с риском таким образом, чтобы из массива конкурсов со сработанными автоматическими индикаторами риска, пользователь мог легко идентифицировать конкурсы с высокими факторами риска и признаками нарушения законодательства. Таким образом, ответственный за аудит имеет возможность получить полную картину и понимание распределения процедур по количеству факторов риска и признаков нарушения законодательства определенных с помощью автоматических индикаторов.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
Для целей этого руководства термин </span>
            <span className="c8">
«уровень риска конкурса»</span>
            <span className="c1">
&nbsp;будет использоваться в значении количества признаков нарушения законодательства определенных с помощью автоматических индикаторов риска. При создании очереди используются следующие критерии для оценки уровня риска конкурса:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <ul className="c21 lst-kix_wn1z6i1ipq6l-0 start">
            <li className="c3 c30 display-inline-flex-li">
<span className="c10 pl-5">
Вероятность наступления неблагоприятного события / риск потери бюджетных средств из-за несоблюдения закупающей организацией законодательства в сфере государственных закупок на всех стадиях процесса государственной закупки - в рамках методологии использования автоматических индикаторов риска эта вероятность измеряется количеством сработанных автоматических индикаторов риска для одного конкурса либо закупки и степени тяжести возможного риска или правонарушения на который указывает индикатор автоматического риска (понятие условный вес риска будет использоваться для целей этого руководства). Автоматические индикаторы риска отличаются по степени риска друг от друга, некоторые индикаторы указывают на меньшую степень риск чем другие.</span>
            </li>
            <li className="c3 c30 display-inline-flex-li">
<span className="c1 pl-5">
Стоимость конкурса или закупки приравнивается к существенности потенциальных потерь при наступлении неблагоприятных событий. Определяется в денежном выражении.</span>
            </li>
            <li className="c3 c30 display-inline-flex-li">
<span className="c1 pl-5">
Природа возможного риска - в данном контексте — это источник потенциального риска. На данном этапе разработки методологии для потребности формирования очереди источником потенциального риска считается закупающая организация, которая генерирует конкурсы и закупки с риском.</span>
            </li>
          </ul>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Приоритезация конкурсов с риском может осуществляться за выбранный период и на уровне всей системы государственных закупок. Таким образом ответственные за аудит имеют возможность определять закупающие организации, которые генерируют наиболее рискованные конкурсы, делать сравнительный анализ между ними и осуществлять оценку рисков всей системы госзакупок в стране.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Также ответственные за аудит могут осуществлять приоритезацию процедур с риском на уровне одной закупающей организации. Это позволит эффективно осуществлять оценку риска закупающей организации, отбирать конкурсы для детального аудита и производить отслеживание результатов по решению проблем, которые были выявлены в результате аудита.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c23 c8">
Порядок приоритезации или построения конкурсов/закупок в очередь по уровню риска</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Данный процесс предусматривает использования двух факторов:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Уровень риска конкурса.</span>
            <span className="c1">
&nbsp;Каждый автоматический индикатор риска имеет присвоенное ему значение условного веса риска, выраженного в числовом значении (см. принцип оценки выше). В приложении внедрены наборы автоматических индикаторов риска, которые применимы для каждого метода закупки. Условный вес риска, при позитивном срабатывании части или всех индикаторов риска свойственных конкурсу определенного метода закупки, суммируются и формируют общий вес риска конкурса. В зависимости от уровня общего веса риска, конкурсу присваивается уровень риска конкурса, который может принимать пять значений следующим образом:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Таблица 2:</span>
            <span className="c1">
&nbsp;Уровень риска, который определяется по диапазону общего веса риска конкурса</span>
          </p>
        </div>
        <table className="c64">
          <tbody>
          <tr className="c41">
            <td className="c97" colSpan="1" rowSpan="2">
              <p className="c3">
<span className="c17">
Метод закупки</span>
              </p>
            </td>
            <td className="c58" colSpan="2" rowSpan="1">
              <p className="c2">
<span className="c17">
Очень низкий</span>
              </p>
            </td>
            <td className="c0" colSpan="2" rowSpan="1">
              <p className="c2">
<span className="c17">
Низкий</span>
              </p>
            </td>
            <td className="c66" colSpan="2" rowSpan="1">
              <p className="c2">
<span className="c17">
Средний</span>
              </p>
            </td>
            <td className="c60" colSpan="2" rowSpan="1">
              <p className="c2">
<span className="c17">
Высокий</span>
              </p>
            </td>
            <td className="c57" colSpan="2" rowSpan="1">
              <p className="c2">
<span className="c17">
Очень высокий</span>
              </p>
            </td>
          </tr>
          <tr className="c9">
            <td className="c75" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&gt;=</span>
              </p>
            </td>
            <td className="c53" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&lt;=</span>
              </p>
            </td>
            <td className="c86" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&gt;=</span>
              </p>
            </td>
            <td className="c76" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&lt;=</span>
              </p>
            </td>
            <td className="c14" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&gt;=</span>
              </p>
            </td>
            <td className="c87" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&lt;=</span>
              </p>
            </td>
            <td className="c27" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&gt;=</span>
              </p>
            </td>
            <td className="c87" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&lt;=</span>
              </p>
            </td>
            <td className="c92" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
&gt;=</span>
              </p>
            </td>
            <td className="c67" colSpan="1" rowSpan="1">
              <p className="c3 c18">
<span className="c5">
</span>
              </p>
            </td>
          </tr>
          <tr className="c9">
            <td className="c44" colSpan="1" rowSpan="1">
              <p className="c3">
<span className="c15">
Одноэтапный</span>
              </p>
            </td>
            <td className="c16" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
0</span>
              </p>
            </td>
            <td className="c51" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
1</span>
              </p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
2</span>
              </p>
            </td>
            <td className="c65" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
3</span>
              </p>
            </td>
            <td className="c50" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
4</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
5</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
6</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
8</span>
              </p>
            </td>
            <td className="c74" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
9</span>
              </p>
            </td>
            <td className="c56" colSpan="1" rowSpan="1">
              <p className="c3 c18">
<span className="c5">
</span>
              </p>
            </td>
          </tr>
          <tr className="c9">
            <td className="c44" colSpan="1" rowSpan="1">
              <p className="c3">
<span className="c15">
Двухэтапный</span>
              </p>
            </td>
            <td className="c16" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
0</span>
              </p>
            </td>
            <td className="c51" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
1</span>
              </p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
2</span>
              </p>
            </td>
            <td className="c65" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
3</span>
              </p>
            </td>
            <td className="c50" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
4</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
5</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
6</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
8</span>
              </p>
            </td>
            <td className="c74" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
9</span>
              </p>
            </td>
            <td className="c56" colSpan="1" rowSpan="1">
              <p className="c3 c18">
<span className="c5">
</span>
              </p>
            </td>
          </tr>
          <tr className="c9">
            <td className="c44" colSpan="1" rowSpan="1">
              <p className="c3">
<span className="c15">
Упрощенный</span>
              </p>
            </td>
            <td className="c16" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
0</span>
              </p>
            </td>
            <td className="c51" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
1</span>
              </p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
2</span>
              </p>
            </td>
            <td className="c65" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
3</span>
              </p>
            </td>
            <td className="c50" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
4</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
5</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
6</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
8</span>
              </p>
            </td>
            <td className="c74" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
9</span>
              </p>
            </td>
            <td className="c56" colSpan="1" rowSpan="1">
              <p className="c3 c18">
<span className="c5">
</span>
              </p>
            </td>
          </tr>
          <tr className="c9">
            <td className="c44" colSpan="1" rowSpan="1">
              <p className="c3">
<span className="c15">
На понижение цены</span>
              </p>
            </td>
            <td className="c16" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
0</span>
              </p>
            </td>
            <td className="c51" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
1</span>
              </p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
2</span>
              </p>
            </td>
            <td className="c65" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
3</span>
              </p>
            </td>
            <td className="c50" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
4</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
5</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
6</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
8</span>
              </p>
            </td>
            <td className="c74" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
9</span>
              </p>
            </td>
            <td className="c56" colSpan="1" rowSpan="1">
              <p className="c3 c18">
<span className="c5">
</span>
              </p>
            </td>
          </tr>
          <tr className="c41">
            <td className="c44" colSpan="1" rowSpan="1">
              <p className="c3">
<span className="c15">
Прямого заключения договора.</span>
              </p>
            </td>
            <td className="c16" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
0</span>
              </p>
            </td>
            <td className="c51" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
1</span>
              </p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
2</span>
              </p>
            </td>
            <td className="c65" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
3</span>
              </p>
            </td>
            <td className="c50" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
4</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
5</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
6</span>
              </p>
            </td>
            <td className="c35" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
8</span>
              </p>
            </td>
            <td className="c74" colSpan="1" rowSpan="1">
              <p className="c2">
<span className="c17">
9</span>
              </p>
            </td>
            <td className="c56" colSpan="1" rowSpan="1">
              <p className="c3 c18">
<span className="c5">
</span>
              </p>
            </td>
          </tr>
          </tbody>
        </table>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
На начальном этапе реализации проекта диапазон общего веса риска конкурса для определения уровня риска процедуры предлагается определить экспертным путем. Предусматривается периодическая оценка диапазона для определения уровня риска конкурса, которая будет зависеть от результатов аудитов с применением автоматического приложения. </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Стоимость конкурса (сумма договора конкурса).</span>
            <span className="c1">
&nbsp;Данный фактор учитывается в приоритезации как существенность потенциальных потерь при наступлении неблагоприятных событий, на которые указывают автоматические индикаторы риска. Существенность конкурса влияет на приоритезацию конкурса с риском. При условии одинакового уровня риска конкурсов приоритетней становится конкурс с большей стоимостью.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Алгоритм, который применяется для приоритезации следующий:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
1)</span>
            <span className="c19">
&nbsp;</span>
            <span className="c1">
Каждому конкурсу присваивается ранг существенности, то есть из всего массива конкурсов, конкурс с наименьшей стоимостью присваивается ранг 1, следующему – ранг 2 и конкурсу с наибольшей стоимостью присваивается ранг “n”.</span>
          </p>
          <p className="c3">
<span className="c10">
2)</span>
            <span className="c19">
&nbsp;</span>
            <span className="c1">
Для каждого конкурса определяется уровень риска как описано выше и присваивается числовое значение «Очень низкий» - 1, «Низкий» - 2, «Средний» - 3, «Высокий» - 4, «Очень высокий» - 5. В массиве всех конкурсов, каждому конкурсу присваивается ранг уровня риска. Конкурсу с наименьшим значением уровня риска и наименьшей стоимостью в массиве, присваивается ранг уровня риска 1, следующему конкурсу с таким же уровнем риска, но со стоимостью выше, присваивается ранг 2. &nbsp;Таким образом осуществляется ранжирование по возрастанию уровня риска и стоимости конкурсов, где конкурсу с наибольшим уровнем риска и с наибольшей стоимостью в массиве, будет присвоено максимальное значение ранга - «n». </span>
          </p>
          <p className="c3">
<span className="c10">
3)</span>
            <span className="c19">
&nbsp;</span>
            <span className="c10">
Для получения взвешенного ранга конкурса ранг существенности конкурса суммируется с числовым значением уровня риска с применением коэффициента взвешивания. &nbsp;</span>
            <span className="c10 c94 c47 c37">
«Ранг существенности» *0.5 + «Ранг уровня риска» *0.5 = «Взвешенный ранг конкурса»</span>
          </p>
          <p className="c3">
<span className="c10">
4)</span>
            <span className="c19">
&nbsp;</span>
            <span className="c1">
Таким образом, конкурс, который имеет наибольшее значение взвешенного ранга, считается приоритетней конкурса с меньшим значением взвешенного ранга, и будет отображаться в перечне конкурсов с риском как более приоритетный по риску.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Коэффициент взвешивания является настраиваемым параметром и может изменяться пользователем от «0» до «1» но в сумме не превышать «1». По умолчанию применяется коэффициент 0.5 для каждого фактора.</span>
          </p>
        </div>
        <p className="c3">
<span className="c1">
&nbsp;</span>
        </p>
        <h2 className="c38" id="h.ky3mxtr21ftk">
<span className="c36 c8" ref="link_2_4">
Методология приоритезации закупающих организаций, которые генерируют конкурсы с риском </span>
        </h2>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>

          Данный процесс предусматривает использования двух факторов:
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Уровень риска закупающей организации.</span>
            <span className="c10">
Уровень риска закупающей организации определяется исходя из уровня риска конкурсов закупок, которые эта организация осуществила за анализируемый период. Для оценки уровня риска закупающей организации применяется расчет для определения средневзвешенного уровня риска с учетом существенности (стоимости) конкурсов с различным уровнем риска.Формула расчета </span>
            <img src="/formula.png" />
            <span className="c1">
&nbsp; где:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
«R» -  расчетный уровень риска закупающей организации в числовом значении;</span>
          </p>
          <p className="c3">
<span className="c10">
«Х» - уровень риска процедуры в числовом значении;</span>
          </p>
          <p className="c3">
<span className="c10">
«W» - существенность (стоимость) конкурсов.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c5">
Исходя из полученного расчета, присваивается уровень риска закупающей организации с использованием диапазона: 0-1= «очень низкий»; 1-2= «Низкий»; 2-3= «Средний»; 3-4 = «Высокий»; 4-5= «Очень высокий».</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Общая стоимость конкурсов (закупок) закупающей организации.</span>
            <span className="c1">
 Данный фактор учитывается в приоритезации как существенность возможных потенциальных потерь от рискованной практики закупающей организации, исходя из присвоенного уровня риска.  При условии одинакового уровня риска двух закупающих организаций, приоритетней для внимания считается организация, которая сгенерировала конкурсы с большей общей стоимостью.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Алгоритм, который применяется для приоритезации организаций следующий:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
1)</span>
            <span className="c19">
     </span>
            <span className="c1">
Каждой закупающей организации присваивается ранг существенности, то есть из всего массива закупающих организаций, организации с наименьшей стоимостью сумм всех ее конкурсов, присваивается ранг 1, следующей – ранг 2 и организации с наибольшей стоимостью присваивается ранг “n”.</span>
          </p>
          <p className="c3">
<span className="c10">
2)</span>
            <span className="c19">
     </span>
            <span className="c1">
Для каждой закупающей организации определяется уровень риска как описано выше и присваивается числовое значение «Очень низкий» - 1, «Низкий» - 2, «Средний» - 3, «Высокий» - 4, «Очень высокий» - 5. В массиве всех закупающих организаций за анализируемый период, каждой организации присваивается ранг уровня риска. Организации с наименьшим значением уровня риска и с наименьшей стоимостью всех процедур в массиве, присваивается ранг уровня риска 1, следующей организации с таким же уровнем риска, но со стоимостью процедур выше, присваивается ранг 2.  Таким образом осуществляется ранжирование по возрастанию уровня риска и стоимости всех конкурсов, где организации с наибольшим уровнем риска и с наибольшей стоимостью всех ее конкурсов в массиве, будет присвоено максимальное значение ранга - «n». </span>
          </p>
          <p className="c3">
<span className="c10">
3)</span>
            <span className="c19">
     </span>
            <span className="c10">
Для получения взвешенного ранга организации ранг существенности всех ее конкурсов суммируется с числовым значением уровня риска организации с применением коэффициента взвешивания.  </span>
            <span className="c10 c47 c37 c94">
«Ранг существенности» *0.5 + «Ранг уровня риска организации» *0.5 = «Взвешенный ранг закупающей организации»</span>
          </p>
          <p className="c3">
<span className="c10">
4)</span>
            <span className="c19">
     </span>
            <span className="c1">
Таким образом, закупающая организация, которая имеет наибольшее значение взвешенного ранга, считается приоритетней для анализа, чем организация с меньшим значением взвешенного ранга, и будет отображаться в перечне закупающих организаций как более приоритетная.</span>
          </p>
          <p className="c3">
<span className="c5">
Коэффициент взвешивания является настраиваемым параметром и может изменяться пользователем от «0» до «1» но в сумме не превышать «1». По умолчанию применяется коэффициент 0.5 для каждого фактора.</span>
          </p>
        </div>

        <h2 className="c38" id="h.4iz22i13wtmx">
          <span className="c36 c8" ref="link_2_5">Балловая (скоринговая) методология, внедренная в контрольные листы для оценки результатов компонентов контрольного листа.</span>
        </h2>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Балловая (скоринговая) методология предлагается для оценки результатов аудита госзакупок. Данная методология внедрена в автоматизированные контрольные листы, которые размещены в автоматическом приложении.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Балловая (скоринговая) методология позволяет произвести автоматическую оценку результатов, полученных в ходе аудита и заполнения элементов каждого вида контрольных листов.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>

          <p className="c3">
<span className="c1">
Каждый контрольный лист содержит перечень вопросов и компонентов, по которым необходимо получить информацию в виде объяснений, документации, понимания процессов и доказательств.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Каждый контрольный лист предусматривает наличие ответов «Да», «Нет» либо «Не применимо» по каждому вопросу, компоненту и подкомпоненту, которые в свою очередь имеют балл и значение, которые учитываются при оценке методом автоматического скоринга. При этом ответственный за аудит, может дополнить ответ комментариями и дополнительной информацией по анализируемому вопросу или компоненту.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
      <span className="c1">
      При заполнении контрольного листа ответственный за аудит определяет степень влияния компонента контрольного листа на оценку результатов аудита, если его значение негативное (ответ «нет»).</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3">
<span className="c1">
Определение степени влияния компонента контрольного листа необходимо для алгоритма автоматического скоринга, который делает автоматическую оценку обнаруженных недостатков в результате заполнения контрольного листа в системе закупок или конкурсах аудируемой организации. Определение степени влияния компонента производиться ответственным за аудит исходя из его опыта, понимания аудируемой организации и профессионального суждения. Определение степени влияния компонента и балла осуществляется с применением следующей шкалы:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Балл 1 - «Очень низкий»</span><span className="c1">, когда степень влияния компонента или вопроса и его риск очень низкая;</span>
          </p>
          <p className="c3">
<span className="c8">
Балл 2- «Низкий»</span>
            <span className="c1">
 - когда степень влияния недостатка удаленная;</span>
          </p>
          <p className="c3">
<span className="c8">
Балл 3- «Средний»</span>
            <span className="c1">
 - степень влияния недостатка может возникнуть при наличии негативных условий компонента;</span>
          </p>
          <p className="c3">
<span className="c8">
Балл 4- «Высокий»</span>
            <span className="c1">
 - степень влияния недостатка на эффективность процесса закупающей организации скорее всего присутствует и требует устранения;</span>
          </p>
          <p className="c3">
<span className="c8">
Балл 5- «Очень высокий»</span>
            <span className="c1">
 - недостаток существует сейчас, влияет на процесс и требует устранения;</span>
          </p>
          <p className="c3">
<span className="c8">
Балл 6- «Критический»</span>
            <span className="c1">
 - степень влияния обнаруженного недостатка критична для всего процесса закупок закупающей организации. Данный компонент по своей природе не может являться частью автоматического скоринга так как его наличие уже само по себе очень значительно и требует немедленных действий по устранению.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
При завершении заполнения контрольного листа представителем СП КР, система автоматически сделает подсчет и оценку обнаруженных недостатков следующим образом:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
1)</span>
            <span className="c19">
     </span>
            <span className="c1">
Система подсчитывает количество элементов контрольного листа, где ответ был «Нет» и производит суммирование соответствующих баллов влияния компонентов с ответом «Нет». Ответ «нет» опровергает утверждение в элементе контрольного и свидетельствует о выявленных недостатках в процессах госзакупок закупающей организации.   </span>
          </p>
          <p className="c3">
<span className="c10">
2)</span>
            <span className="c19">
     </span>
            <span className="c1">
Система подсчитает количество элементов контрольного листа, где ответ был «Да» и автоматически присвоит условный балл влияния 1 – «очень низкий». Ответ «Да» компонента контрольного листа, подтверждает утверждение в вопросе и свидетельствует об отсутствии недостатка. Таким образом, потенциальный риск от данного компонента оценивается как «очень низкий» для целей оценки результатов аудита.</span>
          </p>
          <p className="c3">
<span className="c10">
3)</span>
            <span className="c19">
     </span>
            <span className="c10">
Система не берет во внимание для подсчета, те случаи, где ответ на элемент контрольного листа был «Не применимо». Так же, система не учитывает в оценке те элементы контрольного листа, где ответ был «Нет» и балл степени влияния был присужден </span>
            <span className="c23 c8">
6 - «Критический».</span>
          </p>
          <p className="c3">
<span className="c10">
4)</span>
            <span className="c19">
     </span>
            <span className="c1">
Автоматическая оценка результатов подсчитывается следующим образом:</span>
            <span className="c69 c10 c37">
(Сумма балов влияния ответов «Нет» + Сумма балов влияния ответов «Да»)/общее количество ответов «Да» и «Нет».</span>
          </p>
          <p className="c3">
<span className="c1">
Таким образом выводится, рассчитанный результат аудита оценки конкурса или закупающей организации с помощью автоматического баллового (скорингового) алгоритма (критические сведения не учитываются алгоритмом). Оценка производится по шкале:</span>
          </p>
          <p className="c3">
<span className="c8">
0-1 - "Недостатки отсутствуют "</span>
            <span className="c1">
 - в результате аудита, недостатков обнаружено не было.</span>
          </p>
          <p className="c3">
<span className="c8">
1-2 - "Незначительные недостатки"</span>
            <span className="c1">
 - в результате аудита, незначительные недостатки были обнаружены, наличие которых не приведёт к существенным искажениям эффективности закупочного процесса.</span>
          </p>
          <p className="c3">
<span className="c8">
2-3 - "Недостатки присутствуют"</span>
            <span className="c1">
 - в результате аудита, недостатки были обнаружены, систематическое наличие которых приведёт к существенным искажениям эффективности закупочного процесса в будущем.</span>
          </p>
          <p className="c3">
<span className="c8">
3-4- "Высокий уровень недостатков "</span>
            <span className="c1">
 - в результате аудита, существенные недостатки были обнаружены, наличие которых способствует искажению эффективности закупочного процесса и требуют устранения.</span>
          </p>
          <p className="c3">
<span className="c8">
4-5 - "Очень высокий уровень недостатков "</span>
            <span className="c1">
 - в результате аудита, существенные недостатки были обнаружены, которые искажают эффективность всех закупочных процессов организации и требуют немедленного устранения.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Несмотря на предложенную автоматическую оценку результатов аудита предполагается, что ответственный за аудит представитель СП КР осуществит финальную оценку аудита конкурсов госзакупок закупающей организации руководствуясь полученными результатами и применяя свое профессиональное суждение. </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Вышеизложенный алгоритм предлагается для начального этапа реализации проекта. Алгоритм подсчета и применения балловой (скоринговой) методологии может быть изменен и настроен соответственно в приложении исходя из результатов проведенных аудитов. Рекомендуется периодически проводить оценку эффективности методологии и производить необходимое калибрование алгоритма.</span>
          </p>
        </div>

        <h1 className="c34" id="h.idkezwnevif4">
<span className="c8" ref="link_3">
3.&nbsp;ИСТОЧНИКИ ДАННЫХ</span>
        </h1>

        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
В современном мире публичных и государственных закупок, так же как в любых областях деятельности объемы информации, с которыми приходится сталкиваться государственным и негосударственным организациям, просто колоссальны. И от того, в какой степени организация способна извлечь максимум из имеющейся в ее распоряжении информации, зависит успех ее деятельности и эффективности. Залог успеха - в построении эффективной информационно-аналитической системы (ИАС).</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Использование в инфраструктуре государственных закупок информационно-аналитической системы объясняется рядом причин: стремлением к общей реорганизации бизнес-процессов, желанием повысить качество информации для широкого круга пользователей, необходимостью поддержки планирования, достижения высокоэффективных результатов по распределению национальных бюджетных ресурсов и осуществления эффективного контроля в целом.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Задачей аналитического приложения, которое разработано в рамках пилотного проекта является эффективное хранение, обработка и анализ данных для потребностей аудита государственных закупок.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Эффективное хранение информации достигается наличием в составе аналитического приложения целого ряда источников данных. Обработка и объединение информации достигается применением инструментов извлечения, преобразования и загрузки данных. Анализ данных осуществляется при помощи современных инструментов в этой области.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Источники данных, которые используются аналитическим приложением, по типам и назначению можно классифицировать следующим образом: транзакционные источники данных, хранилища данных, витрины данных.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
На этапе пилотного внедрения в качестве транзакционного источника данных используется информация, которая внесена в электронную систему государственных закупок Кыргызской Республики. Эти данные могут заноситься как вручную, так и автоматически в соответствии с существующими правилами пользования системой. На этапе первоначальной фиксации данные поступают через систему госзакупок в соответствующие транзакционные базы данных. Несмотря на то что на данный момент используются только транзакционные данные из системы госзакупок, аналитическое приложение предусматривает интеграцию с другими транзакционными базами данных,  которые могут содержать ценную для предметного анализа государственных закупок информацию (например: базы казначейства по совершенным проплатам контрактов госзакупок, данные минюста о участниках закупочного процесса и другие).</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Поскольку транзакционные источники данных, как правило, не согласованы друг с другом, то для анализа таких данных требуется их объединение и преобразование. Поэтому на следующем этапе решается задача консолидации данных, их преобразования и очистки, в результате чего данные поступают в модуль аналитических баз данных в аналитическом приложении. Аналитические базы данных, будь то хранилища данных или витрины данных, и есть те основные источники, из которых пользователь приложения черпает информацию, используя автоматические алгоритмы расчета индикаторов риска, агрегацию результатов и анализ.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Архитектура аналитического приложения насчитывает следующие уровни:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
1) сбор и первичная обработка данных;</span>
          </p>
          <p className="c3">
<span className="c1">
2) извлечение, преобразование и загрузка данных с применением стандарта OCDS;</span>
          </p>
          <p className="c3">
<span className="c1">
3) складирование данных; </span>
          </p>
          <p className="c3">
<span className="c1">
4) представление данных в витринах данных;</span>
          </p>
          <p className="c3">
<span className="c1">
5) анализ данных; </span>
          </p>
          <p className="c3">
<span className="c1">
6) Web-портал.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
1)</span>
            <span className="c19">
     </span>
            <span className="c23 c8">
Сбор и первичная обработка данных</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
К первому уровню относятся упоминавшиеся уже источники данных, как правило именуемые транзакционными или операционными источниками (базами) данных. Транзакционные базы данных включают в себя источники данных, ориентированные на фиксацию результатов конкурсного процесса госзакупок. Требования, предъявляемые к транзакционным базам данных, обусловили их следующие отличительные особенности: способность быстро обрабатывать данные и поддерживать высокую частоту их изменения, ориентированность, как правило, на обслуживание процесса госзакупок.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
В данном случае для потребностей пилотного проекта используются базы данных, которые обслуживают сервисы Интернет-Портала электронных государственных закупок Кыргызской Республики (далее – Портал</span>
            <span className="c10">
<a className="c49" href="https://www.google.com/url?q=http://zakupki.gov.kg/popp/&amp;sa=D&amp;ust=1567507327657000">
 </a>
          </span>
            <span className="c10 c84">
<a className="c49" href="https://www.google.com/url?q=http://zakupki.gov.kg/popp/&amp;sa=D&amp;ust=1567507327657000">
http://zakupki.gov.kg</a>
</span>
            <span className="c1">
          ).  </span>
          </p>


          <p className="c3">
<span className="c1">
Информация в базах данных электронной системы закупок на данный момент ориентирована на конкретные процессы госзакупок и управляется транзакциями, она сильно детализирована и часто корректируется. Процесс сбора информации по транзакциям, ее сохранение и возможные корректирования происходят независимо от потребностей и функционирования аналитического приложения, которое разработано в рамках данного проекта и происходит согласно установленным правилам организаций, которые контролируют и поддерживают функционирование системы госзакупок в стране.</span>
          </p>
          <p className="c18 c81">
<span className="c1">
</span>
          </p>
          <p className="c3">
<span className="c8">
2)</span>
            <span className="c19">
     </span>
            <span className="c23 c8">
Извлечение, преобразование и загрузка данных</span>
          </p>
          <p className="c3">
<span className="c1">
Процесс извлечения, преобразования и загрузки данных поддерживается разработанным ETL-инструментами (extraction, transformation, loading), предназначенными для извлечения данных из транзакционных источников электронной системы госзакупок, их преобразования и консолидации, а также поддерживает загрузки в целевые аналитические базы данных разработанного аналитического приложения. На этапе преобразования устраняется избыточность данных, проводятся необходимые процессы структурирования данных, валидация качества и агрегирования. Трехступенчатый процесс извлечения, преобразования и загрузки осуществляется на основе установленного регламента, который базируется на стандарте открытых контрактных данных (OCDS) разработанного Open Contracting Partnership - независимой международной программой по поддержке и консультированию использования открытых данных в сфере государственных контрактов и публичных закупках, которая была создана по инициативе ряда признанных международных экспертов в сфере публичного администрирования и финансов в 2012 году в структуре Всемирного Банка.</span>
          </p>
          <p className="c3">
<span className="c1">
Ключевая цель разработки OCDS инфраструктуры данных состоит в том, чтобы обеспечить наличие единого источника структурированных данных о государственных закупках и договорах, основанных на информации об открытых электронных государственных закупках и договорах.</span>
          </p>
          <p className="c3">
<span className="c1">
Существующие и будущие электронные правительственные сервисы должны иметь доступ ко всем релевантным данным о государственных закупках так же, как и возможность их интеграции, в случае необходимости, для задач бизнес-аналитики, инструментов мониторинга и аудита и прочих сервисов электронного правительства.</span>
          </p>
          <p className="c3">
<span className="c1">
Для целей проекта, аналитическим приложением используется набор открытых данных в формате OCDS и извлеченных из национальной системы ЭГС.</span>
          </p>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c18 c81">
<span className="c1">
</span>
          </p>
          <p className="c3">
<span className="c8">
3)</span>
            <span className="c19">
     </span>
            <span className="c23 c8">
Складирование данных</span>
          </p>
          <p className="c3">
<span className="c1">
К третьему уровню относятся источники данных, которые называют хранилищами данных (от англ. Data Warehouse). Хранилища данных включают в себя источники данных, ориентированные на хранение и анализ информации. Такие источники в аналитическом приложении объединяют информацию из транзакционных систем и позволяют анализировать ее в комплексе с применением автоматических алгоритмов индикаторов риска.</span>
          </p>
          <p className="c18 c81">
<span className="c1">
</span>
          </p>
          <p className="c3">
<span className="c8">
4)</span>
            <span className="c19">
     </span>
            <span className="c23 c8">
 Представление данных в витринах данных</span>
          </p>
          <p className="c3">
<span className="c1">
К четвертому уровню относятся источники данных, предназначенные для проведения целевого анализа (с использованием алгоритмов индикаторов риска). Эти данные строятся на основе информации из хранилища данных, но могут также формироваться из данных, взятых непосредственно из транзакционных систем, когда хранилище данных каким-либо причинам не применяется.</span>
          </p>
          <p className="c3">
<span className="c1">
Витрины в аналитическом приложении организуются в виде реляционной базы данных со схемой "звезда", где центральная таблица, таблица фактов, предназначенная в основном для хранения количественной информации, связана с таблицами-справочниками.</span>
          </p>
          <p className="c3">
<span className="c1">
Отличие витрин данных от транзакционных баз данных заключается в том, что первые служат для удовлетворения потребностей конечных пользователей, не являющихся профессиональными программистами, например аналитики-аудиторы. Транзакционные же базы данных используются в основном операторами, отвечающими за ввод и обработку первичной информации, а не за ее анализ.</span>
          </p>
          <p className="c3">
<span className="c1">
Применение реляционных витрин данных в сочетании с современными инструментами анализа данных позволяет превратить просто данные в полезную информацию, на основе которой можно принимать эффективные решения и в нашем случае выявлять риски в процессах госзакупок.</span>
          </p>
          <p className="c18 c81">
<span className="c1">
</span>
          </p>
          <p className="c3">
<span className="c23 c8">
5) Анализ данных</span>
          </p>
          <p className="c3">
<span className="c1">
К следующему уровню относятся разработанные программные средства аналитического приложения для непосредственного анализа данных с помощью автоматических алгоритмов индикаторов риска, которые способствуют выявлению несоответствий в установленных процессах конкурсов в электронной системе госзакупок.</span>
          </p>
          <p className="c3">
<span className="c1">
В результате анализа с помощью алгоритмов индикаторов риска генерируется новый набор данных, которые характеризуют транзакцию госзакупок на предмет рисков, учтенных алгоритмами. Программные средства аналитического приложения позволяют пользователям ответственным за аудит проводить всесторонний анализ этой информации, помогают успешно ориентироваться в больших объемах данных, анализировать информацию, делать на основе анализа объективные выводы и принимать обоснованные решения, строить стратегии, планы и программы аудитов, сводя аудиторские риски к допустимому минимуму.</span>
          </p>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c18 c81">
<span className="c1">
</span>
          </p>
          <p className="c3">
<span className="c23 c8">
6) Web-портал</span>
          </p>
          <p className="c3">
<span className="c1">
Аналитическое приложение использует Web-портал для доступа пользователей к аналитической информации и управления ею.  Возможность доступа к информации через привычный Web-браузер позволяет экономить на затратах, связанных с закупкой и поддержкой настольных аналитических приложений для большого числа клиентских мест. Реализация Web-портала позволяет снабжать аналитической информацией пользователей в любой точке страны, подключенных к порталу через Интернет.</span>
          </p>
          <p className="c3">
<span className="c1">
Полное использование аналитического приложения зависит не только от анализа и объема доступных данных. Качество данных одинаково важно, независимо от назначения базы данных или системы обработки данных.</span>
          </p>
          <p className="c3">
<span className="c1">
Качество данных имеет несколько аспектов:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Таблица 3:</span>
            <span className="c1">
 Качество данных</span>
          </p>
        </div>
        <table className="c64">
          <tbody>
          <tr className="c93">
            <td className="c22 c80" colSpan="1" rowSpan="1">
              <p className="c12 c70">
<span className="c8 c79">
Измерение качества данных [1]</span>
              </p>
            </td>
            <td className="c62 c80" colSpan="1" rowSpan="1">
              <p className="c12">
        <span className="c79 c8">
        Определение</span>
              </p>
            </td>
            <td className="c6 c80" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c79 c8">
Применение к данным госзакупок</span>
              </p>
            </td>
          </tr>
          <tr className="c31">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Доступность</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Степень доступности данных, быстрота и легкость их извлечения.</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c83">
        <span className="c1">
        Доступны ли на национальном уровне все соответствующие данные о государственных закупках в режиме онлайн?</span>
              </p>
            </td>
          </tr>
          <tr className="c77">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Соответствующее количество данных</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Степень соответствия объема данных поставленной задаче</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c59">
<span className="c1">
Сколько данных собирается по закупкам в структурированных базах данных? Покрывает ли это все потребности?</span>
              </p>
            </td>
          </tr>
          <tr className="c52">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c40">
<span className="c1">
Полнота</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Степень достаточности широты и глубины данных для поставленной задачи. Данные не пропущены.</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Заполнены ли все соответствующие поля данных достаточным количеством данных на соответствующем уровне детализации? Встроены ли (автоматизированные) элементы управления для проверки отсутствующих данных (или для отклонения незавершенных загрузок)?</span>
              </p>
            </td>
          </tr>
          <tr className="c68">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1 c11">
Усвояемость</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Степень легкости понимания данных</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Понятно ли (техническая) информация сформулирована? Цели или объекты закупок выражены не в слишком общих терминах?</span>
              </p>
            </td>
          </tr>
          <tr className="c31">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12 c54">
<span className="c1">
Краткое представление</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12 c73">
<span className="c1">
Степень компактности представления данных</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Надлежащее использование кодирования, такого как «Общий словарь закупок» (CPV) или использование OCDS.</span>
              </p>
            </td>
          </tr>
          <tr className="c43">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c59">
<span className="c1">
Последовательное представление</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c59">
<span className="c1">
Степень представления данных в том же формате</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c59">
<span className="c1">
Вводятся ли данные в том же формате, такие как даты, суммы и т. д., в одном и том же формате (дд-мм-гггг и гггдд вместе) для всех процедур? Есть соответствующие валидации на уровне ввода данных.</span>
              </p>
            </td>
          </tr>
          <tr className="c31">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Правдоподобие</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Степень правдивости и достоверности данных</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12 c45">
<span className="c1">
Являются ли загруженные данные в базах данных государственных закупок хорошим представлением реальности? Достаточно ли контроля для проверки достоверности / правдивости?</span>
              </p>
            </td>
          </tr>
          <tr className="c63">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Легкость манипулирования</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12 c72">
<span className="c1">
Степень легкости манипулирования данными и применения к различным задачам</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Могут ли данные использоваться для управления процессом закупок, их аудита, выявления и расследования случаев мошенничества и коррупции (особенно, когда большинство баз данных и систем создаются только для одной из этих целей, в основном не для обнаружения и расследования случаев мошенничества и коррупции)?</span>
              </p>
            </td>
          </tr>
          <tr className="c63">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Свободные от ошибок</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Степень правильности и надежности данных</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Какие элементы управления встроены для проверки данных на наличие ошибок: проверки орфографии / языка, логические проверки (например, существует ли дата, возможна ли с учетом начала и сроков выполнения процесса, соответствует ли код продукта описанию закупки), проверки на двойные записи, так далее.?</span>
              </p>
            </td>
          </tr>
          <tr className="c63">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c40">
<span className="c1">
Интерпретируемость</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12 c54">
<span className="c1">
Степень несоответствия данных языкам, символам и единицам и определениям ясны.</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12 c54">
<span className="c1">
Особенно актуально в многоязычном контексте: доступны ли данные на всех соответствующих языках и правильно ли переведены на другие? Одинаковы ли определения во всех этих языках? Являются ли единицы измерения (метрическая система, имперская система) понятными для всех групп продуктов?</span>
              </p>
            </td>
          </tr>
          <tr className="c63">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Объективность</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Степень беспристрастности и непредвзятости данных</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Кто вводит данные в систему? Кто обновляет данные и проверяет факты, точность и соответствующие данные, касающиеся всех данных, введенных в систему? Управляются ли данные и база данных исключительно одной организацией или это общая система со сбалансированным влиянием?</span>
              </p>
            </td>
          </tr>
          <tr className="c31">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Уместность</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12 c54">
<span className="c1">
Степень применимости и полезности данных для поставленной задачи</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12 c28">
<span className="c1">
Существуют ли стандарты для ввода данных в процесс и содержания? Что данные содержат в качестве информации? Как были установлены стандарты? Для чего собираются данные?</span>
              </p>
            </td>
          </tr>
          <tr className="c46">
            <td className="c22" colSpan="1" rowSpan="1">
              <p className="c95">
<span className="c1">
Репутация</span>
              </p>
            </td>
            <td className="c62" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Степень, в которой данные высоко ценятся с точки зрения их источника или содержания</span>
              </p>
            </td>
            <td className="c6" colSpan="1" rowSpan="1">
              <p className="c12">
<span className="c1">
Какая организация или отдел управляет базой данных и отвечает за данные в системе? Насколько влиятельным является этот государственный орган с точки зрения принятия решений, законодательства и исполнения государственных закупок? Консультируются ли другие организации с этим органом в отношении управления государственными закупками и сбора соответствующих данных?</span>
              </p>
            </td>
          </tr>
          </tbody>
        </table>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c69 c10 c37">
 </span>
          </p>
          <p className="c3">
<span className="c1">
Даже самая совершенная аналитическая система, которая используется как инструмент для аудита не сможет улучшить процесс аудита или мониторинга государственных закупок, который неэффективен из-за проблем с качеством данных. При отборе конкурсов для аудита соответствующие учреждения могут недооценивать, и очень значительно, уровень усилий, необходимых для выявления и интеграции необходимых наборов данных из системы государственных закупок, так же, как и других правительственных источников, что позволяет аналитической системе или автоматическому инструменту для аудита госзакупок работать оптимально.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Разработка всестороннего набора требований к данным для поддержки эффективной работы аналитического приложения поможет выявить проблемы качества данных и архитектуры системы госзакупок в целом. Решение этих проблем в исходных системах путем изменения операционных процедур, внедрения средств управления приложениями и эффективного управления основными данными и устранения системных пробелов может повысить эффективность и результативность аудита госзакупок и любых других контрольных мероприятий.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <h1 className="c34" id="h.reuunadudri1">
<span className="c8" ref="link_4">
4.</span><span className="c23 c8">ОЦЕНКА РИСКА ЗАКУПАЮЩИХ ОРГАНИЗАЦИЙ</span>
          </h1>
          <p className="c3">
<span className="c15">
 </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Основной задачей риск-ориентированного подхода является обеспечение возможности эффективной организации аудита государственных закупок при осуществлении своей деятельности специалистами Счетной Палаты.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Мировая практика свидетельствует об активном использовании методов оценки риска с использованием анализа данных в целях снижения общей административной нагрузки на субъекты аудита с одновременным повышением уровня эффективности аудитов, проводимых уполномоченными органами. Кроме того, использование в аудите госзакупок методов оценки риска с использованием анализа данных позволяет более точно учитывать особенности осуществления процессов, которые происходят в электронной системе госзакупок и хозяйственной деятельности закупающих организаций. В связи с этим необходимо внедрение дифференцированного подхода к проведению аудита закупок в зависимости от степени риска причинения закупающими организациями вреда (ущерба) охраняемым законом ценностям, который позволит существенно повысить эффективность расходования ресурсов на аудит государственных закупок путем сосредоточения усилий инспекторского состава счетной палаты на наиболее значимых направлениях.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Риск-ориентированный подход обладает высоким уровнем гибкости и позволяя учитывать текущие действия закупающих организаций по исполнению обязательных требований, возникших во время аудита. Его реализация требует постоянного централизованного сбора информации о деятельности закупающих организаций и перерасчет уровня риска.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Риск-ориентированный подход позволяет на основе данных системы госзакупок рассчитать единый уровень риска для каждой закупающей организации в системе.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
В результате применения риск-ориентированный подхода аналитическое приложение производит расчет итогового рискового балла для каждого конкурса и закупающей организации, что позволяет «подкрасить» каждую закупающую организацию в соответствии с уровнем риска в перечне организаций из системы ЭГЗ.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Использование автоматических индикаторов риска предполагает создание модели, которая по выборке транзакций госзакупок закупающей организации сможет определить зависимость между исходными данными сгенерированных процессов госзакупок и величиной риска, который представляет деятельность этой организации.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Созданные автоматические индикаторы риска применяются для анализа всех закупающих организаций и их транзакций в системе госзакупок, в результате чего в зависимости от результатов анализа проводится автоматическая оценка риска. Эта оценка является основанием для принятия решения о проведении соответствующих аудиторских мероприятий.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Для оценки риска закупающих организаций приложение использует настройки по умолчанию. Пользователь имеет возможность изменить настройки по умолчанию если в этом есть необходимость. Для этого в панели настроек, пользователь может установить свои настройки для осуществления оценки рисков следующим образом:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
            <span className="c7" ref="link_4_1">Настроить параметр оценки риска закупающих организаций</span>
            <span className="c10 c11">: через меню панели настройки оценки рисков, пользователь может настроить коэффициент взвешивания для параметра</span>
            <span className="c10 c48 c37">«Ранг суммарной существенности конкурсов закупающей организации» и «Ранг риска закупающей организации»</span>
            <span className="c10 c48">. </span>
            <span className="c1">
Коэффициент взвешивания является настраиваемым параметром и может изменяться пользователем от «0» до «1» но в сумме не превышать «1». Коэффициент взвешивания применяется что бы придать значение меньшее или большее фактору ранга существенности или фактору ранга уровня риска.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3">
<span className="c1">
Иными словами, если пользователь предполагает, что для оценки рисков закупающих организаций сумма завершенных государственных закупок является более существенной характеристикой риска в системе госзакупок он имеет возможность присвоить повышенный коэффициент фактору ранга существенности. Таким образом закупающие организации с одинаковым уровнем риска транзакций, но при этом с существенными суммами закупок, будут определяться системой как более рисковые нежели организации с суммами закупок меньшими. Такой же подход может применяться для фактора ранга уровня риска организации.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
   </span>
          </p>
          <p className="c3">
<span className="c7">
Настроить параметр приоритезации процедур закупок: </span>
            <span className="c10 c11">
пользователь может настроить коэффициент взвешивания для факторов</span>
            <span className="c10">
 </span>
            <span className="c10 c48 c37">
«Ранг существенности» и «Ранг суммарного риска конкурса»</span>
            <span className="c10 c48">
 </span>
            <span className="c10 c11">
для приоритезации по риску процедур закупающей организации.</span>
            <span className="c10 c48">
 </span>
            <span className="c1">
Коэффициент взвешивания является настраиваемым параметром и может изменяться пользователем от «0» до «1» но в сумме не превышать «1». Коэффициент взвешивания применяется что бы придать значение меньшее или большее фактору ранга существенности процедуры или фактору ранга уровня риска процедуры.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3">
<span className="c1">
Иными словами, если пользователь предполагает, что для оценки рисков процедур госзакупок сумма закупки является более существенной характеристикой риска в системе госзакупок он имеет возможность присвоить повышенный коэффициент фактору ранга существенности процедуры. Таким образом процедуры закупок с одинаковым уровнем риска (количеством сработавших индикаторов риска), но при этом с суммой закупки выше, будут определяться системой как более рисковые нежели процедуры с суммами закупок меньшими. Такой же подход может применяться для фактора ранга уровня риска процедуры.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
 </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1" ref="link_4_2">
Далее предоставлена пошаговая инструкция использования аналитического инструмента для оценки риска закупающих организаций.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>

          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3">
<span className="c8">
Шаг 1</span>
            <span className="c10">
 – После вхождения в аналитическую систему для анализа практики ведения госзакупок закупающих организаций с применением автоматических индикаторов риска пользователь заходит на страницу аналитического приложения «</span>
            <span className="c10 c11">
Оценка рисков - закупающие организации</span>
            <span className="c1">
».  </span>
          </p>
          <p className="c3">
<span className="c1">
 </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Шаг 2</span>
            <span className="c1">
 – Пользователю предлагается установить период, за который необходимо осуществить анализ.  По умолчанию система отображает анализ закупающих организаций с начала 2019 года и по текущую дату минус один день на 10 страницах в таблице по 10 закупающих организаций. Как правило, период устанавливается в соответствии с периодом предстоящих аудитов. При выборе периода система предоставит информацию о закупающих организация в форме перечня (списка) с заданными полями. Закупающие организации в перечне (списке) будут выстроены по уровню их рискованности от наиболее высокого уровня к наименее рискованному в соответствии с методологией, которая описана в разделе 2.3 этого руководства.  При выборе периода система будет анализировать только те транзакции закупок, в которых дата подписания контрактов (либо предположительная дата подписания контракта для незавершенных транзакций, у которых был выбран победитель) совпадает с выбранным периодом.  </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3">
<span className="c8">
Шаг 3</span>
            <span className="c1">
 – Пользователь, может применить средства фильтрации для отображения более детальной информации в разрезе интересующих аспектов. Например, применить фильтр для отображения закупающих организаций и анализ риска этих организаций в конкретном регионе страны. На данный момент в рамках реализации данного пилотного инструмента доступны для анализа следующие автоматические фильтры:</span>
          </p>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Регион</span>
            <span className="c1">
 – применения этого фильтра позволит отображать закупающие организации, которые функционируют в выбранном регионе.  Регионы представлены в соответствии с административно-территориальными единицами первого уровня КР.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Метод</span>
            <span className="c1">
 – применение фильтра по методу закупок. Система произведет анализ риска закупающих организаций лишь по тем процедурам, которые соответствуют выбранному методу закупок. Например, при выборе метода «одноэтапный конкурс» анализ риска будет осуществлен только по результатам, одноэтапных конкурсов, которые осуществила закупающая организация в выбранный период.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Уровень риска</span>
            <span className="c1">
 – применение фильтра позволит отобразить закупающие организации с выбранным уровнем риска.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Раздел ОКГЗ</span>
            <span className="c10">
 – </span>
            <span className="c1 c11">
применение фильтра позволит произвести анализ риска закупающих организаций, которые осуществляли закупки в выбранном разделе ОКГЗ за выбранный период.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Индикаторы</span>
            <span className="c1 c11">
 – Пользователь может выбрать автоматические индикаторы риска для анализа. При этом система отобразит анализ закупающих организаций в практике которых были конкурсы, в транзакциях которых, были обнаружены нарушения в соответствии с сработавшими индикаторами риска.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Закупающая организация – </span>
            <span className="c1 c11">
пользователь может ввести идентификационных номер или название закупающей организации, либо же выбрать из списка для вывода информации только по выбранным организациям.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c7">
Шаг 4 – </span>
            <span className="c10 c11">
после выбора интересующего периода и фильтров, система в форме списка отобразит перечень закупающих организаций по уровню риска от наибольшего к наименьшему в соответствии с методологией, описанной в разделе 2.3 «</span>
            <span className="c8 c37">
Методология приоритезации закупающих организаций, которые генерируют конкурсы с рисками</span>
            <span className="c1 c11">
». В таблице отображена следующая информация:</span>
          </p>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
ИНН закупающей организации</span>
            <span className="c1 c11">
 – идентификационный номер закупающей организации в системе госзакупок. Номер соответствует номеру, который указан закупающей организацией при регистрации в национальной системе госзакупок страны.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Наименование закупающей организации</span>
            <span className="c1 c11">
 – наименование организации, которая выступает как закупающая организация и которое она указала при регистрации в национальной системе госзакупок страны.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Уровень риска закупающей организации</span>
            <span className="c1">
 – уровень риска закупающей организации, который присвоен аналитическим приложением в соответствии с методологией, описанной в разделе 2.3. данного руководства.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Количество конкурсов</span>
            <span className="c1">
 – количество завершенных конкурсов закупающей организации за выбранный период времени. При этом завершенным считается конкурс, в котором состоялось событие выбора победителя.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Сумма конкурсов</span>
            <span className="c1">
 – фактическая сумма всех завершенных конкурсов закупающей организации за выбранный период времени в системе ЭГЗ. Фактическая сумма соответствует сумме, поданной победителем в лоте конкурса (цена конкурсной заявки).  </span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Сумма договоров</span>
            <span className="c1">
 – сумма всех договоров закупающей организации за выбранный период времени, которые были отображены в системе ЭГЗ КР.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Конкурсы с рисками</span>
            <span className="c1">
 – количество конкурсов закупающей организации за выбранный период времени, где присутствует риск, выявленный с помощью применения автоматических индикаторов риска аналитическим приложением.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Конкурсы c риском - «договор подписан»</span>
            <span className="c10 c11">
 - количество конкурсов закупающей организации в стадии “договор подписан” </span>
            <span className="c10">
в системе ЭГЗ КР</span>
            <span className="c10 c11">
 за выбранный </span>
            <span className="c1">
период времени, где присутствует риск, выявленный с помощью применения автоматических индикаторов риска аналитическим приложением.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Сумма конкурсов с рисками</span>
            <span className="c10">
 – фактическая сумма всех конкурсов </span>
            <span className="c10 c11">
за выбранный </span>
            <span className="c1">
период времени, где присутствует риск, выявленный с помощью применения автоматических индикаторов риска аналитическим приложением. Фактическая сумма соответствует сумме, поданной победителем в лоте конкурса (цена конкурсной заявки). </span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Сумма конкурсов c рисками, со статусом "договор подписан"</span>
            <span className="c10">
 – фактическая </span>
            <span className="c10 c11">
сумма конкурсов закупающей организации в стадии “договор подписан” </span>
            <span className="c10">
в системе ЭГЗ КР</span>
            <span className="c10 c11">
 за выбранный </span>
            <span className="c1">
период времени, где присутствует риск, выявленный с помощью применения автоматических индикаторов риска аналитическим приложением. Фактическая сумма соответствует сумме, поданной победителем в лоте конкурса (цена конкурсной заявки). </span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Индикаторы </span>
            <span className="c1">
– перечень коротких названий автоматических индикаторов риска, с помощью которых были выявлены риски во время анализа конкурсов закупающей организации.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>


          <p className="c3 c4">
<span className="c8">
Количество индикаторов – </span>
            <span className="c1">
количество уникальных автоматических индикаторов риска, с помощью которых были выявлены риски во время анализа конкурсов закупающей организации.</span>
          </p>
          <p className="c3 c4">
<span className="c23 c8">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Взвешенный ранг </span>
            <span className="c1 c11">
– взвешенный ранг риска закупающей организации, который применяется для приоритезации организаций по уровню риска в соответствии с методологией, описанной в разделе 2.3.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Количество конкурсов с некорректными данными</span>
            <span className="c1">
 – количество конкурсов закупающей организации за выбранный период времени, с неудовлетворительным данными в формате OCDS, которые не могут быть использованы аналитическим приложением.   </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3">
<span className="c10 c11">
Пользователь имеет возможность отсортировать информацию в таблице от наименьшего к наибольшему значению и наоборот, по следующим полям: количество конкурсов, сумма конкурсов, сумма контрактов, количество конкурсов с рисками, количество конкурсов c рисками, со статусом «контракт подписан», сумма конкурсов с рисками, сумма конкурсов c рисками, со статусом "контракт подписан", количество индикаторов и количество конкурсов с плохими данными.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3">
<span className="c8 c37">
Примечание:</span>
            <span className="c10">
 на данный момент, в национальной системе ЭГЗ на достаточном уровне не реализованы необходимые контроли за соблюдением полного процесса государственных закупок в соответствии с действующим законодательством. Частой является ситуация, когда после выбора победителя в лоте или конкурсе, организаторы конкурса в системе ЭГЗ не производят необходимых дальнейших действий. Таким образом, транзакция конкурса с выбранным победителем не меняет статус на завершенную и остается активной, и соответственно не происходит публикация необходимой информации о заключенном контракте. В ходе реализации проекта администраторы национальной системы ЭГЗ подтвердили данный факт и сообщили, что чаще всего процесс переноситься из системы ЭГЗ в ручной режим, где происходит подписание фактического контракта между закупающей организацией и победителем конкурса. После подписания ответственные представители закупающей организации «забывают» завершить конкурс в системе ЭГЗ. Таким образом, для целей данного проекта, применяется следующее допущение: «Конкурсы, где были определены победители и которые остаются активными 30+ дней, считаются завершенными и являются предметом анализа для автоматических индикаторов риска в аналитическом приложении». Ответственным за аудит следует принимать во внимание данное допущение при работе с аналитическим приложением. Ответственные за аудит имеют возможность выявлять конкурсы в активном статусе и с выбранным победителем путем анализа колонок таблицы «конкурсы» и «конкурсы-«договор подписан», а также просмотра стадии каждого конкурса «активная»
 или «завершенная». </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c7">
Шаг 5 </span>
            <span className="c10 c11">
– Результаты информации из таблицы с помощью кнопки «экспорт» могут быть экспортированы в приложение </span>
            <span className="c7">
excel</span>
            <span className="c1 c11">
 для дальнейшей обработки пользователями по их усмотрению. При этом, пользователю предлагается выбрать набор полей для экспорта. Набор полей состоит из перечисленных полей информации описанных выше и дополнительно предлагаться следующие поля:</span>
          </p>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Регион</span>
            <span className="c10 c11">
 – название региона КР, в котором осуществляет свою деятельность закупающая организация. </span>
            <span className="c1">
Регионы представлены в соответствии с административно-территориальными единицами первого уровня КР.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Количество завершенных лотов</span>
            <span className="c1">
 – количество лотов, в которых определены победители.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Количество договоров</span>
            <span className="c1">
 – количество подписанных договоров между закупающей организацией и поставщиками (подрядчиками), которые зарегистрированы в системе ЭГЗ.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Сумма победивших предложений</span>
            <span className="c1">
 – сумма всех победивших предложений в конкурсах закупающей организации за выбранный период.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Сумма победивших предложений с риском</span>
            <span className="c10">
 – фактическая сумма всех победивших предложений </span>
            <span className="c10 c11">
за выбранный </span>
            <span className="c1">
период времени, где присутствует риск, выявленный с помощью применения автоматических индикаторов риска аналитическим приложением. Фактическая сумма соответствует сумме, поданной победителем в лоте конкурса (цена конкурсной заявки). </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
На данный момент система позволяет экспорт информации в приложение </span>
            <span className="c7">
excel</span>
            <span className="c1">
 в таблицу до 1000 строк.</span>
          </p>
        </div>

        <h1 className="c34" id="h.1g6dwj3aijc9">
<span className="c8" ref="link_5">
5.</span><span className="c23 c8">ПРИМЕНЕНИЕ АВТОМАТИЧЕСКИХ ИНДИКАТОРОВ РИСКА ДЛЯ ОПРЕДЕЛЕНИЯ ВЫБОРКИ КОНКУРСОВ ДЛЯ АУДИТА</span>
        </h1>


        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Аналитическое приложение позволяет в визуальном интерфейсе с помощью реализованных индикаторов риска построить стратегию отбора конкурсов государственных закупок, подлежащих проверке с целью сбора аудиторских доказательств.</span>
          </p>


        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Основной принцип: объединение результатов разных видов реализованных в системе автоматических индикаторов риска в единую оценку риска.  </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Преимущества:</span>
          </p>
          <ul className="c21 lst-kix_7vwnacsc6f9r-0 start">
            <li className="c3 c30">
<span className="c1">
Возможность объединения результатов разных видов автоматических индикаторов риска в единый рисковый балл;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Простота формирования и изменения стратегии формирования аудиторской выборки;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Возможность тестирования различных вариаций стратегий;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Повышение оперативности изменений стратегией и их контроль.</span>
            </li>
          </ul>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Аналитическое приложение способствует формированию оптимального плана аудита госзакупок, учитывая заданные ограничения: временные затраты на проверку, рабочее время инспекторов ответственных за аудит, географическое расположение закупающей организации и так далее.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Согласно Международного стандарта аудита (МСА) 530 «Аудиторская выборка»: Аудиторская выборка дает аудитору возможность получить и оценить аудиторские доказательства, касающиеся отдельных характеристик отобранных элементов, чтобы сделать или помочь сделать вывод о генеральной совокупности, из элементов которой выборка формируется. Аудиторская выборка может осуществляться с использованием методов формирования нестатистической либо статистической выборки.»</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Примеры использования результатов аналитического приложения при методах отбора конкурсов закупающей организации для формирования выборок:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Стратификация:</span>
            <span className="c1">
 Эффективность аудита может стать более высокой, если ответственный за аудит стратифицирует генеральную совокупность государственных закупок закупающей организации, разделив ее на самостоятельные подмножества с характеристиками, по которым их можно идентифицировать. Ответственный за аудит может использовать уровень риска каждой закупки в качестве характеристики для разделения на подмножества, таким образом ответственный за аудит может разделить совокупность государственных закупок на 5 подмножеств с характеристиками риска конкурсов «Очень высокий», «Высокий», «Средний», «Низкий», «Очень низкий» и осуществить выборку из подмножеств, концентрируясь на процедурах с более высоким риском.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Не статистическая выборка.</span>
            <span className="c1">
 С помощью аналитического приложения аудитор может отобрать для аудита конкурсы с наибольшим риском и другими характеристиками, которые сочтет уместными использую свое профессиональное суждение (риск-ориентированный подход к выбору элементов для тестирования). Таким образом, вывод о полученных доказательствах будут относиться лишь к выбранным элементам.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Применение риск-ориентированного подхода в комбинации со статистической выборкой эффективно применяется для достижения полного покрытия генеральной совокупности конкурсов закупающей организации за период.  Интеграция этих двух концепций – риск-ориентированная и статистическая выборка - способствует в построении рационального и эффективного плана аудита, при котором ответственный за аудит сможет получить качественные доказательства минимизируя риск выборки и сформировать выводы по всем закупкам закупающей организации в соответствии с целями аудита.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1" ref="link_5_1">
Далее, предоставлена пошаговая инструкция использования аналитического инструмента для оценки риска конкурсов и формирования понимания распределения риска в генеральной совокупности конкурсов закупающей организации.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>

          <p className="c3">
<span className="c8">
Шаг 1</span>
            <span className="c1">
 – После вхождения в аналитическую систему для анализа практики ведения госзакупок закупающих организаций с применением автоматических индикаторов риска пользователь заходит на страницу «Оценка рисков – конкурсы» и в поле для выбора закупающей организации вводит ИНН или название закупающей организации в поле фильтра «Выбрать организацию».</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Шаг 2</span>
            <span className="c1">
 – Пользователю предлагается установить период, за который необходимо осуществить анализ.  По умолчанию система отображает анализ всех закупок с начала 2019 года и по текущую дату минус один день на 10 страницах в таблице по 10 закупок. Как правило, период устанавливается в соответствии с периодом предстоящих аудитов. При выборе периода система предоставит информацию о закупках, закупающих организация в форме перечня (списка) с заданными полями. Закупки в перечне (списке) будут выстроены по уровню их риска от наиболее высокого уровня к меньшему в соответствии с методологией, которая описана в разделе 2.2 этого руководства.  При выборе периода система будет анализировать только те транзакции закупок, в которых дата подписания контрактов (либо предположительная дата подписания контракта для незавершенных конкурсов, у которых был выбран победитель) совпадает с выбранным периодом.  </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Шаг 3</span>
            <span className="c1">
 – Пользователь, может применить средства фильтрации для отображения более детальной информации в разрезе интересующих аспектов. Например, применить фильтр для отображения метода одноэтапным конкурсом и анализ риска закупок, которые были осуществлены с применением этого метода. На данный момент в рамках реализации данного пилотного инструмента доступны для анализа следующие фильтры:</span>
          </p>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Метод</span>
            <span className="c1">
 – применение фильтра по методу закупок. Система произведет анализ риска лишь по тем процедурам, которые соответствуют выбранному методу закупок. Например, при выборе метода «одноэтапный конкурс» анализ риска будет осуществлен только по результатам, одноэтапных конкурсов, которые осуществила закупающая организация в выбранных период.</span>
          </p>
          <p className="c3 c4">
<span className="c23 c8">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Индикаторы</span>
            <span className="c1 c11">
 – Пользователь может выбрать автоматические индикаторы риска для анализа. При этом система отобразит анализ закупающих организаций в практике которых были процедуры с позитивно сработавшими выбранными индикаторами риска.</span>
          </p>
          <p className="c3 c4">
<span className="c23 c8">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Раздел ОКГЗ</span>
            <span className="c10">
 – </span>
            <span className="c1 c11">
применение фильтра позволит произвести анализ риска закупающих организаций, которые осуществляли закупки в выбранном разделе ОКГЗ за выбранный период.</span>
          </p>
          <p className="c3 c4">
<span className="c23 c8">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Сумма от и до</span>
            <span className="c1">
 – применение фильтра позволит выбрать конкурсы, фактическая сумма которых находится в указанном диапазоне.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Уровень риска</span>
            <span className="c1">
 – применение фильтра позволит отобразить конкурсы с выбранным уровнем риска.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Номер конкурса – </span>
            <span className="c1 c11">
пользователь может ввести идентификационный номер интересующего конкурса, либо же выбрать из списка для вывода информации только по выбранным конкурсам.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c7">
Шаг 4 – </span>
            <span className="c10 c11">
после выбора интересующего периода и фильтров, система в форме списка отобразит перечень конкурсов по уровню риска от наибольшего к наименьшему в соответствии с методологией, описанной в разделе </span>
            <span className="c7">
2.2</span>
            <span className="c10 c11">
 «</span>
            <span className="c8 c37">
Методология приоритезации процедур со сработавшими автоматическими индикаторами риска</span>
            <span className="c1 c11">
». В таблице будет отображена следующая информация:</span>
          </p>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Номер конкурса</span>
            <span className="c1 c11">
 – идентификатор процедуры в центральной базе данных в системе ЭГЗ КР.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Сумма конкурса</span>
            <span className="c1 c11">
 – предполагаемая цена конкурса, предусмотренная в плане закупок, размещенном на веб-портале государственных закупок.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Сумма завершенных лотов</span>
            <span className="c8">
 </span>
            <span className="c1">
– фактическая сумма выигравших предложений по всем завершенным лотам конкурса (победитель выбран).</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Метод конкурса</span>
            <span className="c10 c11">
 </span>
            <span className="c1">
– метод закупки, который использует закупающая организация в данном конкурсе. Системой анализируются такие методы проведения госзакупок: конкурс одноэтапным методом, конкурс двухэтапным методом, конкурс упрощенным методом, конкурс методом на понижение цены, метод прямого заключения договора.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Дата публикации –</span>
            <span className="c1">
 дата публикации конкурса на портале госзакупок КР.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Дата договора (завершения конкурса)</span>
            <span className="c1">
 – дата перехода конкурса в стадию “Договор подписан”, в случае если организаторы конкурса отобразили корректно факт подписания договора. Для конкурсов, где был сделан выбор победителя, но статус остается активным 30+ дней, датой договора считается дата выбора победителя + 30 дней.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Завершенные лоты (есть выбор победителя) –</span>
            <span className="c1">
 количество лотов, для которых закупающая организация определила победителя.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Участники</span>
            <span className="c1 c11">
 – количество субъектов предпринимательской деятельности, которые подали конкурсные заявки на участие в данном конкурсе.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Дисквалификации</span>
            <span className="c1">
 – количество конкурсных заявок, поданных на участие в конкурсе, которые были отклонены закупающей организацией.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Победители</span>
            <span className="c1">
 – количество поставщиков, победивших в конкурсе.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Индикаторы </span>
            <span className="c1">
– перечень коротких названий автоматических индикаторов риска, с помощью которых были выявлены риски во время анализа конкурса.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c8">
Количество индикаторов – </span>
            <span className="c1">
количество уникальных автоматических индикаторов риска, с помощью которых были выявлены риски во время анализа конкурса.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Наименований товаров</span>
            <span className="c1 c11">
 – количество предметов закупки, которые закупающая организация приобрела посредством данного конкурса.</span>
          </p>
          <p className="c3 c4">
<span className="c1 c11">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Уровень риска</span>
            <span className="c1 c11">
 - уровень риска, присвоенный конкурсу системой в соответствии с суммарным риском определенного с помощью автоматических индикаторов.</span>
          </p>
          <p className="c3 c4">
<span className="c1 c11">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
ИНН закупающей организации</span>
            <span className="c1 c11">
 – идентификационный номер закупающей организации в системе госзакупок. Номер соответствует номеру, который указан закупающей организацией при регистрации в национальной системе госзакупок страны.</span>
          </p>
          <p className="c3 c4">
<span className="c1">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Наименование закупающей организации</span>
            <span className="c1 c11">
 – наименование организации, которая выступает как закупающая организация и которое она указала при регистрации в национальной системе госзакупок страны.</span>
          </p>
          <p className="c3 c4">
<span className="c1 c11">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Взвешенный ранг конкурса</span>
            <span className="c1 c11">
 – взвешенный ранг риска конкурса, который применяется для приоритезации конкурсов по уровню риска с соответствием методологии, описанной в разделе 2.2.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1 c11">
Пользователь имеет возможность отсортировать информацию в таблице от наименьшего к наибольшему значению и наоборот.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c7">
Шаг 5 </span>
            <span className="c10 c11">
– Результаты информации с таблицы с помощью кнопки «экспорт» могут быть экспортированы в приложение </span>
            <span className="c7">
excel</span>
            <span className="c1 c11">
 для дальнейшей обработки пользователями по их усмотрению. При этом, пользователю предлагается выбрать набор полей для экспорта. Набор полей состоит из перечисленных полей информации описанных в шаге выше и дополнительно предлагаться следующие поля:</span>
          </p>
          <p className="c3 c4">
<span className="c1 c11">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Гарантийное обеспечение конкурсной заявки</span>
            <span className="c1 c11">
 - размер гарантийного обеспечения конкурсной заявки, установленный закупающей организацией.</span>
          </p>
          <p className="c3 c4">
<span className="c1 c11">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Стадия конкурса</span>
            <span className="c1 c11">
 - стадия конкурса, на которой находится конкурс на текущий момент времени.</span>
          </p>
          <p className="c3 c4">
<span className="c1 c11">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Валюта конкурса</span>
            <span className="c1 c11">
 - валюта, которую закупающая организация определила для проведения конкурса.</span>
          </p>
          <p className="c3 c4">
<span className="c1 c11">
 </span>
          </p>
          <p className="c3 c4">
<span className="c7">
Количество лотов</span>
            <span className="c1 c11">
 - количество лотов, в которых определен победитель.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c10">
На данный момент система позволяет экспорт информации в приложение </span>
            <span className="c7">
excel</span>
            <span className="c1">
 в таблицу до 1000 строк.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c8">
Шаг 6 </span>
            <span className="c10">
– Аудитор может просматривать аналитическую визуализацию в форме основных (базовых) показателей, аналитический таблиц и графиков для изучения концентрации и локализации риска конкурсов закупающих организации.</span>
          </p>

        </div>

        <h1 className="c34" id="h.b1i4nxgyz1t7">
<span className="c8" ref="link_6">
6.&nbsp;КОНТРОЛЬНЫЕ ЛИСТЫ</span>
        </h1>

        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Для проведения качественного аудита государственных закупок особое внимание необходимо уделять составлению и использованию контрольных листов. Контрольный лист – это инструмент аудита (своеобразная памятка), который позволяет ответственному за аудит помнить об информации и доказательствах, которые он должен получить, и о том, что фактически должно быть проверено в ходе аудита закупающей организации и ее закупок. Контрольный лист нельзя использовать как список вопросов, которые задаются представителям аудируемой (проверяемой) закупающей организации, и в нем не делаются отметки о полученных ответах. Контрольные листы должны способствовать сбору объективных и надежных доказательств, чтобы ответственный за аудит мог с их помощью составить заключение аудита с подробным описанием результатов аудита, аспектов, охваченных различными проверенными документами, выявленных нарушений и их доказательств, рекомендаций, а также любых обнаруженных мелких отклонений, которые требуют особого внимания в последующем.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Еще одно важное преимущество контрольного листа - возможность правильно организовать время проведения аудита. При подготовке контрольного листа ответственный за аудит может предположить, сколько времени потребуется на то, чтобы проанализировать различные проблемы. Это позволяет достаточно точно планировать аудит. Потом, при проведении самого аудита, можно управлять темпом проверки и вносить необходимые корректировки.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
При использовании контрольных листов для аудита государственных закупок ответственные за аудит должны учитывать, что:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <ul className="c21 lst-kix_wc3qux1kmi7l-0 start">
            <li className="c3 c30">

<span className="c1">
Оценка процессов государственных закупок может быть частью аудита и подхода к его проведению (например при аудите эффективности – аудит контролей и/или аудит результатов, финансовом аудите – системно-ориентированный подход и/или подход тестирования по существу) и, следовательно, вопросы контрольного листа необходимо будет интегрировать в широкую методологию таких аудитов;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
В зависимости от оцененных рисков не все вопросы будут применимы к каждому аудиту;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
В соответствии с мандатами аудита и национальными правилами, некоторые пункты могут быть изменены или вопросы добавлены. Например, финансирование через национальные, государственные или местные бюджеты возлагают на закупающую организацию обязательство соблюдать соответствующие национальные, государственные или местные финансовые правила осуществления закупок;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
В случаях аудита эффективности вопросы об оценки соотношении цены и качества должны быть добавлены в контрольные листы;</span>
            </li>
            <li className="c3 c30">
<span className="c1">
Контрольные листы также должны быть проанализированы на предмет применимости к аудитам отдельных видов деятельности государственных секторов.  </span>
            </li>
          </ul>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Предполагается, что в ходе этапа планирования команда ответственных за аудит, исходя из результатов оценки и анализа риска аудируемой организации и установленных критериев оценки, которые будут использованы в ходе аудита, пересмотрит предложенные шаблоны контрольных листов и на этапе планирования и проведет их моделирование в соответствии с потребностями каждого конкретного аудита.</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Данное аналитическое приложение, предусматривает использование контрольных листов при проведении аудита и их заполнение в электронном виде. На начальном этапе реализации этого проекта и запуска аналитического приложения были внедрены шаблоны контрольных листов. Таким образом, доступны к применению шаблон для аудита процессов закупки закупающей организации «1. Контрольный лист - оценка закупающей организации». Этот шаблон в основном содержит ряд вопросов, которые относятся к анализу функции закупочного процесса организации и оценки существующей среды контроля. Также доступны шаблоны для аудита отдельных закупок, где компоненты контрольных листов организованы в соответствии с основными этапами процесса закупок, такими как планирование, обоснование выбора метода закупки, управление конкурсным процессом, присуждение и подписание договора, изменения договора, прогресс и финальные оплаты. Так же шаблон для аудита закупки/конкурса содержит раздел, где выводятся результаты сработанных индикаторов риска.  </span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
Функционал аналитического приложения предусматриваем моделирование шаблонов контрольных листов в соответствии с потребностями аудита. Пользователь с правами «Администратор» может осуществлять следующие действия:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>

          <div className="information-block-content">
            <p className="c3">
<span className="c10">
1)</span>
              <span className="c19">
     </span>
              <span className="c1">
Удалять, добавлять и давать название секций контрольного листа в соответствии с потребностями аудита;</span>
            </p>
            <p className="c3">
<span className="c10">
2)</span>
              <span className="c19">
  </span>
              <span className="c1">
Удалять или добавлять вопросы в секциях контрольного листа в соответствии с потребностями, аудита которые были определены на этапе планирования;</span>
            </p>
            <p className="c3">
<span className="c1">
 </span>
            </p>
            <p className="c3">
<span className="c10">
3)</span>
              <span className="c19">
 </span>
              <span className="c1">
Удалять и сохранять шаблоны контрольных листов в разделе приложения «библиотека шаблонов».</span>
            </p>
            <p className="c3">
<span className="c1">
Пользователь аналитического приложения с правами «Аудитор» может осуществлять следующие действия:</span>
            </p>
            <p className="c3">
<span className="c10">
1)</span>
              <span className="c19">
     </span>
              <span className="c1">
Для выполнения аудита закупающей организации и ее закупок ответственный за аудит имеет возможность из библиотеки шаблонов выбрать соответствующий и утвержденный на этапе планирования шаблон контрольного листа для заполнения;</span>
            </p>
            <p className="c3">
<span className="c10">
2)</span>
              <span className="c19">
     </span>
              <span className="c1">
В случае если выбранный шаблон не содержит вопроса, который необходим исходя из обстоятельств текущего аудита, ответственный за аудит имеет возможность самостоятельно добавить необходимый вопрос;</span>
            </p>
            <p className="c3">
<span className="c10">
3)</span>
              <span className="c19">
     </span>
              <span className="c1">
Ответственный за аудит, имеет возможность сохранить контрольный лист как свой собственный шаблон в случаях если он производил добавление вопросов, при этом контрольный лист не сохраняет уже заполненные поля в ходе аудита, таким образом пользователь сможет повторно использовать свой шаблон при аудите однотипных элементов выборки без повторных добавлений вопросов.</span>
            </p>
          </div>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <p className="c3">
<span className="c1">
 </span>
          </p>
          <p className="c3">
<span className="c1">
На этапе осуществления аудита пользователь приложения, который ответственный за аудит может осуществлять следующие действия:</span>
          </p>
        </div>
        <div className="information-block-content">
          <span className="c1">&nbsp;</span>
          <div className="information-block-content">
            <p className="c3">
<span className="c1">
 </span>
            </p>
            <p className="c3">
<span className="c10">
1)</span>
              <span className="c19">
     </span>
              <span className="c1">
Пользователь может сохранять контрольный лист в свой кабинет на любом этапе его заполнения, при этом контрольный лист при сохранении содержит следующую информацию:</span>
            </p>
            <ul className="c21 lst-kix_13k8bfib2ndb-0 start">
              <li className="c3 c30">
<span className="c10 c32">
 </span>
                <span className="c1">
уникальное название контрольного листа – присваивается пользователем;</span>
              </li>
              <li className="c3 c30">
<span className="c1">
название аудита (аудит, который выполняется например – (Аудит эффективности использования бюджетных средств Минфина за первый квартал 2018) – присваивается пользователем;</span>
              </li>
              <li className="c3 c30">
<span className="c1">
Период проведения аудита – присваивается пользователем;</span>
              </li>
              <li className="c3 c30">
<span className="c1">
Название шаблона контрольного листа, который используется – присваивается автоматически системой;</span>
              </li>
              <li className="c3 c30">
<span className="c1">
Номер документа – присваивается автоматически системой;</span>
              </li>
              <li className="c3 c30">
<span className="c1">
Балл оценки результатов для завершенных контрольных листов – присваивается автоматически системой исходя из итоговой оценки результатов контрольного листа, сделанной представителем СП КР;</span>
              </li>
              <li className="c3 c30">
<span className="c1">
Дата заполнения (последнего сохранения) – присваивается автоматически системой исходя из даты последнего изменения в контрольном листе;</span>
              </li>
              <li className="c3 c30">
<span className="c1">
Статус (завершен, активен);</span>
              </li>
              <li className="c3 c30">
<span className="c10 c32">
 </span>
                <span className="c1">
Имя ответственного за аудит, который инициировал заполнения.  </span>
              </li>
            </ul>
            <p className="c3 c29">
<span className="c1">
 </span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c1">
Таким образом, пользователь может оценивать состояние каждого контрольного листа на всех стадиях его заполнения.</span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c1">
 </span>
            </p>
            <p className="c3">
<span className="c1">
Также пользователь имеет возможность просматривать контрольные листы в системе, которые были заполнены и завершены коллегами для других аудитов.</span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c1">
 </span>
            </p>
            <p className="c3">
<span className="c10">
2)</span>
              <span className="c19">
     </span>
              <span className="c1">
Пользователь имеет возможность ответить на каждый вопрос в контрольном "Да", "нет", "не применимо" и добавить комментарии в форме свободного текста для предоставления дополнительной информации, о собранных доказательствах, которые аргументируют сделанный выбор.</span>
            </p>
            <p className="c3">
<span className="c1">
 </span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c10">
3)</span>
              <span className="c19">
     </span>
              <span className="c1">
Пользователю необходимо сделать оценку степени влияния каждого ответа «Нет» для автоматической оценки результатов аудита закупающей организации или закупки (конкурса) в соответствии с балловой (скоринговой) методологией, описанной в разделе 2.4, применив следующую шкалу:</span>
            </p>
            <p className="c3">
<span className="c1">
 </span>
            </p>
            <p className="c3 c24">
<span className="c8">
Балл 1 - «Очень низкий»</span>
              <span className="c1">
, когда степень влияния компонента или вопроса и его риск очень низкая;</span>
            </p>
            <p className="c3 c24">
<span className="c1">
 </span>
            </p>
            <p className="c3 c24">
<span className="c8">
Балл 2- «Низкий»</span>
              <span className="c1">
 - когда степень влияния недостатка удаленная;</span>
            </p>
            <p className="c3 c24">
<span className="c1">
 </span>
            </p>
            <p className="c3 c24">
<span className="c8">
Балл 3- «Средний»</span>
              <span className="c1">
 - степень влияния недостатка может возникнуть при наличии негативных условий компонента;</span>
            </p>
            <p className="c3 c24">
<span className="c1">
 </span>
            </p>
            <p className="c3 c24">
<span className="c8">
Балл 4- «Высокий»</span>
              <span className="c1">
 - степень влияния недостатка на эффективность процесса закупающей организации скорее всего присутствует и требует устранения;</span>
            </p>
            <p className="c3 c24">
<span className="c1">
 </span>
            </p>
            <p className="c3 c24">
<span className="c8">
Балл 5- «Очень высокий»</span>
              <span className="c1">
 - недостаток существует сейчас, влияет на процесс и требует устранения;</span>
            </p>
            <p className="c3 c24">
<span className="c1">
 </span>
            </p>
            <p className="c3 c24">
<span className="c8">
Балл 6- «Критический»</span>
              <span className="c1">
 - степень влияния обнаруженного недостатка критична для всего процесса закупок закупающей организации. Данный компонент по своей природе не может являться частью автоматического скоринга так как его наличие уже само по себе очень значительно и требует немедленных действий по устранению.</span>
            </p>
            <p className="c3 c24">
<span className="c1">
 </span>
            </p>
            <p className="c3">
<span className="c10">
В случае ответа «Да» система автоматически присваивает степень влияния </span>
              <span className="c8">
Балл 1 - «Очень низкий»</span>
              <span className="c1">
, так как присущий риск при позитивном ответе очень низкий по определению. В случае ответа «Не применимо» система автоматически блокирует возможность выбора степени влияния.</span>
            </p>
            <p className="c3">
<span className="c1">
 </span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c10">
4)</span>
              <span className="c19">
     </span>
              <span className="c10">
С помощью функционала, встроенного в контрольный лист, пользователь имеет возможность произвести автоматическую оценку результатов, полученных в ходе аудита и заполнения компонентов каждого вида контрольного листа (закупающая организация, конкурс/закупка) в соответствии с Балловой (скоринговой) методологией, путем нажатия на кнопку </span>
              <span className="c8">
«Рассчитать»</span>
              <span className="c1">
. В случае если присутствуют незаполненные компоненты контрольного листа, система выдаст предупреждение и расчет оценки контрольного листа не произойдет. Для завершения и расчета все вопросы и компоненты должны быть адресованы при заполнении.</span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c10">
5)</span>
              <span className="c19">
     </span>
              <span className="c1">
В контрольных листах конкурсов (закупок), пользователь имеет возможность просматривать информацию о сработанных индикаторах риска для данного конкурса. В контрольном листе отображается следующая информация: 1) Короткое название индикатора, 2) Полное название индикатора, 3) Соответствующий риск, на который указывает индикатор, 4) Уровень риска, на который указывает индикатор.  </span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c10">
6)</span>
              <span className="c19">
     </span>
              <span className="c10">
С помощью собранных при аудите доказательств, пользователю предлагается подтвердить либо же опровергнуть наличие риска, на который указывал индикатор в колонке </span>
              <span className="c8">
«Результат индикатора подтвердился тестированием»</span>
              <span className="c10">
. В случае если риск присутствует пользователь выбирает ответ </span>
              <span className="c8">
«Да»</span>
              <span className="c10">
; если риск не подтвердился доказательствами, пользователю необходимо выбрать ответ </span>
              <span className="c8">
«Нет»</span>
              <span className="c10">
. Пользователю необходимо сделать оценку степени влияния каждого ответа </span>
              <span className="c8">
«Да»</span>
              <span className="c1">
 для автоматической оценки результатов аудита конкурса (закупки) в соответствии с балловой (скоринговой) методологией, описанной в разделе 2.4, применив шкалу, описанную в пункте 3 выше. Таким образом пользователь имеет возможность в своем аудите оценить и учесть риски, выявленные автоматическими индикаторами;</span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c10">
7)</span>
              <span className="c19">
     </span>
              <span className="c10">
Автоматическая оценка результатов аудита, осуществленного с помощью контрольного листа возможна при завершении корректного заполнения всех компонентов контрольного листа путем нажатия кнопки </span>
              <span className="c8">
«</span>
              <span className="c7">
Рассчитать</span>
              <span className="c8">
».</span>
              <span className="c1">
 Система автоматически с помощью всплывающих сообщений подскажет области некорректного заполнения, если такие имеются.</span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c10">
8)</span>
              <span className="c19">
     </span>
              <span className="c1">
Пользователю предлагается сделать собственную оценку результатов аудита проведенного с помощью контрольного листа, учесть результаты автоматической оценки и возможных факторов, проблем и спорных вопросов, которые имеют существенное влияние, но не учитывались при автоматической оценке. Результат оценки представитель СП КР может осуществить по шкале:</span>
            </p>

            <div className="information-block-content">
              <span className="c1">&nbsp;</span>
              <p className="c3">
        <span className="c19">
           </span>
                <span className="c8">
«Недостатки отсутствуют»</span>
                <span className="c1">
 - в результате процедуры аудита, недостатков не обнаружено;</span>
              </p>
              <p className="c3">
        <span className="c19">
           </span>
                <span className="c8">
«Незначительные недостатки»</span>
                <span className="c1">
 - в результате процедуры аудита, незначительные недостатки были обнаружены, наличие которых не приведёт к существенным искажениям эффективности закупочного процесса;</span>
              </p>
              <p className="c3">
        <span className="c19">
           </span>
                <span className="c8">
«Недостатки присутствуют»</span>
                <span className="c1">
 - в результате процедуры аудита, недостатки были обнаружены, систематическое наличие которых приведёт к существенным искажениям эффективности закупочного процесса в будущем;</span>
              </p>
              <p className="c3">
        <span className="c19">
           </span>
                <span className="c8">
«Высокий уровень недостатков»</span>
                <span className="c1">
 - в результате процедуры аудита, существенные недостатки были обнаружены, наличие которых способствует искажению эффективности закупочного процесса и требуют устранения;</span>
              </p>
              <p className="c3">
        <span className="c19">
           </span>
                <span className="c8">
«Очень высокий уровень недостатков»</span>
                <span className="c1">
 - в результате процедуры аудита, существенные недостатки были обнаружены, которые искажают эффективность всех закупочных процессов организации и требуют немедленного устранения.</span>
              </p>
            </div>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c10">
9)</span>
              <span className="c19">
     </span>
              <span className="c1">
Пользователю предлагается описать краткое изложение проблем и спорных вопросов - общее резюме обзора аудита с применением контрольного листа.</span>
            </p>
          </div>
          <div className="information-block-content">
            <span className="c1">&nbsp;</span>
            <p className="c3">
<span className="c10">
10)</span>
              <span className="c19">
 </span>
              <span className="c1">
Пользователь имеет возможность сохранить контрольный лист и экспортировать его в формат  “PDF” для возможности его подписания представителем СП КР и Представителем аудируемого объекта, а также дальнейшего его сохранения как части документации по аудиту в соответствии с действующими правилами.  </span>
            </p>
          </div>
          <h1 className="c34" id="h.idkezwnevif4">
<span className="c8" ref="link_7">
7.&nbsp;ОПИСАНИЕ АВТОМАТИЧЕСКИХ ИНДИКАТОРОВ РИСКА</span>
          </h1>
          <div className="information-block-content">
          <span className="c1">
            <a href="https://kyrgyzstan-indicators.readthedocs.io/ru/latest/indicators.html" target="_blank">Описание автоматических индикаторов риска</a>
          </span>
          </div>
          <p className="c3 c18">
<span className="c5">
</span>
          </p>
          <hr />
          <p className="c3 c18">
<span className="c5">
</span>
          </p>
          <p className="c3">
<span className="c71">
[1]</span>
            <span>
 </span>
            <span className="c10">
Source: PIPINO, LEE and WANG (2002), Data Quality Assessment, p. 212.</span>
            <span className="c10 c37 c69">
 </span>
          </p>
          <p className="c3">
<span className="c5">
 </span>
          </p>
          <p className="c3 c18">
<span className="c5">
</span>
          </p>
        </div>
      </div>
    )
  }
}

function mapStateToProps({
                           navigationStore,
                           auth,
                         }) {
  return {
    defaultSelectedKey: navigationStore.defaultSelectedKey,
    collapsed: navigationStore.collapsed,
    userInfo: auth.userInfo,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeNavigationItem: bindActionCreators(changeNavigationItem, dispatch),
    setBreadCrumbsOptions: bindActionCreators(setBreadCrumbsOptions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(HelpUserManuals))
