import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = {
    container: {
        padding: SIZES.medium,
    },
    containerTwo: {
        flex: 1,
    },
    title: {
        fontSize: SIZES.xLarge,
        fontFamily: FONT.bold,
    },
    recipeTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
        marginHorizontal: SIZES.medium,
        marginBottom: SIZES.xSmall,
    },
    searchInput: {
        height: SIZES.xxLarge,
        borderColor: COLORS.gray,
        borderRadius: SIZES.xxSmall,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: SIZES.xSmall,
    },
    createButton: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.gray,
        borderRadius: SIZES.xxSmall,
        paddingVertical: 10,
        width: 120,
        alignSelf: "center",
    },
    createButtonText: {
        textAlign: 'center',
        fontWeight: '500',
        color: COLORS.lightWhite,
    },
    centerText: {
        textAlign: 'center',
        justifyContent: 'center',

    },
}

export default styles;