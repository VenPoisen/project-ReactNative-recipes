import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.medium,
    },
    label: {
        alignSelf: "flex-start",
        padding: SIZES.xxSmall,
        paddingLeft: SIZES.xSmall,
        letterSpacing: 2,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.secondary,
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
    registerView: {
        marginTop: SIZES.medium,
    },
    registerText: {
        textAlign: "center",
    },
    registerTextLink: {
        color: COLORS.primary,
    },
};

export default styles;