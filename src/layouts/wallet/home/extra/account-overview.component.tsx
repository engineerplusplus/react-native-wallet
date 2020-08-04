/**
 * @format
 */
import React from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import {
  useStyleSheet,
  StyleService,
  Text
} from '@ui-kitten/components';
import { showAlertModal } from 'src/actions/ui';
import { EthereumAddress } from 'src/components/ethereum-address.component';
import { Identicon } from 'src/components/identicon.component';
import { useAccount } from 'src/hooks/useAccount';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';

export const AccountOverview = () => {
  const [editAccount, setEditAccount] = React.useState({
    editing: false,
    name: ''
  });
  const dispatch = useDispatch();
  const i18n = useI18n();
  const account = useAccount();
  const styles = useStyleSheet(themedStyles);

  const handleChangeAccountName = () => {
    setEditAccount({
      editing: false,
      name: ''
    });
  };

  const handleCopyAddress = () => {
    Clipboard.setString(account.address);
    dispatch(showAlertModal({
      message: i18n.t('account_overview.account_copied_to_clipboard'),
      duration: 1500
    }));
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={false}
    >
      <View
        style={styles.container}
      >
        <TouchableOpacity
          onPress={() => {}}
        >
          <Identicon
            address={account.address}
            size="large"
          />
        </TouchableOpacity>
        {editAccount.editing ? (
          <TextInput
            editable={editAccount.editing}
            onChangeText={(value: string) => setEditAccount({
              editing: true,
              name: value
            })}
            onSubmitEditing={handleChangeAccountName}
            onBlur={handleChangeAccountName}
            value={editAccount.name}
            selectTextOnFocus
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
          />
        ) : (
          <TouchableOpacity
            style={styles.field}
            onLongPress={() => setEditAccount({
              editing: true,
              name: account.name
            })}
          >
            <Text
              category="h6"
            >
              {account.name}
            </Text>
          </TouchableOpacity>
        )}
        <Text
          style={styles.field}
          category="label"
        >
          $0
        </Text>
        <TouchableOpacity
          style={[styles.field, styles.addressContainer]}
          onPress={handleCopyAddress}
        >
          <EthereumAddress
            style={styles.address}
            appearance="hint"
            category="label"
            address={account.address}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacingY(2)
  },
  field: {
    marginTop: spacingY(1),
  },
  addressContainer: {
    borderRadius: 40,
		paddingHorizontal: spacingX(1),
    paddingVertical: spacingY(0.5),
    backgroundColor: 'background-basic-color-4'
  },
  address: {
    letterSpacing: 1
  }
});