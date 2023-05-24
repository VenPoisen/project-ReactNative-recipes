import { COLORS, FONT, SIZES } from "../constants/theme";

const styles = {
    cardContainer: {
        backgroundColor: COLORS.lightWhite,
        margin: SIZES.medium,
        overflow: "hidden",
        borderRadius: SIZES.xxSmall,
    },
    recipeImage: {
        width: '100%',
        height: 200,
    },
    recipeDescriptionContainer: {
        padding: SIZES.medium,
    },
    recipeTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
        marginBottom: 8,
        paddingBottom: SIZES.small,
    },
    recipeAuthorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.medium,
    },
    recipeInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.gray2,
        padding: SIZES.medium,

    },
    recipeInfoTextTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONT.bold,
        textAlign: "center",
        color: COLORS.textDark,
    },
    recipeInfoText: {
        fontSize: SIZES.small,
        textAlign: "center",
        color: COLORS.textDark,
    },
    recipeDateText: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    recipeLinkableInfoText: {
        fontSize: SIZES.small,
        fontStyle: 'italic',
        color: '#2E64FE',
    },
    readMoreButton: {
        backgroundColor: COLORS.buttonDark,
        paddingVertical: 8,
        paddingHorizontal: SIZES.small,
        alignItems: 'center',
    },
    readMoreButtonText: {
        color: COLORS.lightWhite,
        fontWeight: 'bold',
    },
};

export default styles;