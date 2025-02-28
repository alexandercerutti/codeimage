import {useI18n} from '@codeimage/locale';
import {
  setAccentVisible,
  setAlternativeTheme,
  setShowGlassReflection,
  setShowHeader,
  setShowWatermark,
  setType,
  terminal$,
} from '@codeimage/store/terminal';
import {SegmentedField} from '@codeimage/ui';
import {ParentComponent, Show} from 'solid-js';
import {fromObservableObject} from '../../core/hooks/from-observable-object';
import {AppLocaleEntries} from '../../i18n';
import {TerminalControlField} from '../TerminalControlField/TerminalControlField';
import {PanelHeader} from './PanelHeader';
import {FullWidthPanelRow, PanelRow, TwoColumnPanelRow} from './PanelRow';

export const WindowStyleForm: ParentComponent = () => {
  const terminal = fromObservableObject(terminal$);
  const [t] = useI18n<AppLocaleEntries>();

  return (
    <>
      <PanelHeader label={t('frame.terminal')} />

      <PanelRow for={'frameAlternativeField'} label={t('frame.backgroundType')}>
        <TwoColumnPanelRow>
          <SegmentedField
            size={'xs'}
            value={terminal.alternativeTheme}
            onChange={setAlternativeTheme}
            items={[
              {label: 'Default', value: false},
              {label: 'Alternative', value: true},
            ]}
          />
        </TwoColumnPanelRow>
      </PanelRow>

      <PanelRow for={'frameHeaderField'} label={t('frame.header')}>
        <TwoColumnPanelRow>
          <SegmentedField
            size={'xs'}
            id={'frameHeaderInput'}
            value={terminal.showHeader}
            onChange={setShowHeader}
            items={[
              {label: t('common.yes'), value: true},
              {label: t('common.no'), value: false},
            ]}
          />
        </TwoColumnPanelRow>
      </PanelRow>

      <Show when={terminal.showHeader}>
        <PanelRow for={'frameTerminalTypeField'}>
          <FullWidthPanelRow>
            <TerminalControlField
              selectedTerminal={terminal.type}
              onTerminalChange={setType}
            />
          </FullWidthPanelRow>
        </PanelRow>
      </Show>

      <Show when={terminal.showHeader && !terminal.alternativeTheme}>
        <PanelRow for={'frameTabAccentField'} label={t('frame.tabAccent')}>
          <TwoColumnPanelRow>
            <SegmentedField
              size={'xs'}
              value={terminal.accentVisible}
              onChange={setAccentVisible}
              items={[
                {label: t('common.yes'), value: true},
                {label: t('common.no'), value: false},
              ]}
            />
          </TwoColumnPanelRow>
        </PanelRow>
      </Show>

      <PanelRow for={'frameTabReflectionField'} label={t('frame.reflection')}>
        <TwoColumnPanelRow>
          <SegmentedField
            size={'xs'}
            value={terminal.showGlassReflection}
            onChange={setShowGlassReflection}
            items={[
              {label: t('common.show'), value: true},
              {label: t('common.hide'), value: false},
            ]}
          />
        </TwoColumnPanelRow>
      </PanelRow>

      <PanelRow for={'frameShowWatermarkField'} label={t('frame.watermark')}>
        <TwoColumnPanelRow>
          <SegmentedField
            size={'xs'}
            value={terminal.showWatermark}
            onChange={setShowWatermark}
            items={[
              {label: t('common.show'), value: true},
              {label: t('common.hide'), value: false},
            ]}
          />
        </TwoColumnPanelRow>
      </PanelRow>
    </>
  );
};
