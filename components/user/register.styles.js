import { COLORS, SIZES } from "../../constants/theme";

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.xxSmall,
        marginBottom: SIZES.small,
        padding: SIZES.xSmall,
    },
    button: {
        backgroundColor: COLORS.buttonDark,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: SIZES.xxSmall,
    },
    buttonText: {
        color: COLORS.lightWhite,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
};

export default styles;