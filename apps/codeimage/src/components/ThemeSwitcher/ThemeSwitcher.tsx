import {Component, createMemo, createSignal, For, Show} from 'solid-js';
import {Text} from '../ui/Text/Text';
import * as styles from './ThemeSwitcher.css';
import {gridSize, ThemeSwitcherVariant} from './ThemeSwitcher.css';
import {ThemeBox} from './ThemeBox';
import {terminal$} from '@codeimage/store/terminal';
import {updateTheme} from '../../state/state';
import {DynamicTerminal} from '../Terminal/dynamic/DynamicTerminal';
import {useStaticConfiguration} from '../../core/configuration';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {Box} from '../ui/Box/Box';
import {FlexField} from '../ui/Field/FlexField';
import {TextField} from '../ui/TextField/TextField';
import {FadeInOutWithScaleTransition} from '../ui/Transition/Transition';
import {useI18n} from '@codeimage/locale';
import {AppLocaleEntries} from '../../i18n';
import {useModality} from '../../core/hooks/isMobile';
import {fromStore} from '../../state/from-store';

function useFilteredThemes() {
  const {themes} = useStaticConfiguration();
  const [search, setSearch] = createSignal('');

  const filteredThemes = createMemo(() => {
    const value = search();
    if (!value || !(value.length > 2)) return themes;
    return themes.filter(theme =>
      theme.properties.label.toLowerCase().startsWith(value.toLowerCase()),
    );
  });

  return [themes, filteredThemes, search, setSearch] as const;
}

export const ThemeSwitcher: Component<ThemeSwitcherVariant> = props => {
  const terminal = fromStore(terminal$);
  const modality = useModality();
  const [t] = useI18n<AppLocaleEntries>();
  const [themes, filteredThemes, search, setSearch] = useFilteredThemes();

  const filteredThemeIds = createMemo(() =>
    filteredThemes().map(theme => theme.id),
  );

  return (
    <Box
      class={styles.grid({
        orientation: props.orientation,
      })}
      style={assignInlineVars({
        [gridSize]: filteredThemes.length.toString(),
      })}
    >
      <Show when={modality === 'full'}>
        <FlexField size={'lg'}>
          <TextField
            type={'text'}
            placeholder={t('themeSwitcher.search')}
            value={search()}
            onChange={setSearch}
          />
        </FlexField>
      </Show>
      <For each={themes}>
        {theme => (
          <FadeInOutWithScaleTransition
            show={filteredThemeIds().includes(theme.id)}
          >
            <ThemeBox theme={theme} onClick={() => updateTheme(theme)}>
              <DynamicTerminal
                tabName={'Untitled'}
                textColor={theme.properties.terminal.text}
                background={theme.properties.terminal.main}
                darkMode={theme.properties.darkMode}
                accentVisible={terminal.accentVisible}
                shadow={terminal.shadow}
                showTab={true}
                readonlyTab={true}
                showHeader={true}
                type={terminal.type}
                showWatermark={false}
              >
                <Text size={'sm'}>{`// Code here`}</Text>
              </DynamicTerminal>
            </ThemeBox>
          </FadeInOutWithScaleTransition>
        )}
      </For>
    </Box>
  );
};
