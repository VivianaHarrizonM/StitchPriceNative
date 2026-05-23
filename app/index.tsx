import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { Colors, Currencies } from "../constants/theme";
import StyledInput from "../components/StyledInput";
import SectionHeader from "../components/SectionHeader";
import ResultRow from "../components/ResultRow";

type NumOrEmpty = number | "";

export default function CrochetCalculator() {
  const [currency, setCurrency] = useState("MXN");
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const [skeinPrice, setSkeinPrice] = useState<NumOrEmpty>("");
  const [gramsPerSkein, setGramsPerSkein] = useState<NumOrEmpty>("");
  const [usedGrams, setUsedGrams] = useState<NumOrEmpty>("");
  const [extraCosts, setExtraCosts] = useState<NumOrEmpty>("");
  const [hours, setHours] = useState<NumOrEmpty>("");
  const [hourPrice, setHourPrice] = useState<NumOrEmpty>("");
  const [profitPercent, setProfitPercent] = useState<NumOrEmpty>("");

  const curr = Currencies[currency];

  // Safe values
  const safeUsedGrams = Number(usedGrams) || 0;
  const safeSkeinPrice = Number(skeinPrice) || 0;
  const safeGramsPerSkein = Number(gramsPerSkein) || 0;
  const safeExtraCosts = Number(extraCosts) || 0;
  const safeHours = Number(hours) || 0;
  const safeHourPrice = Number(hourPrice) || 0;
  const safeProfitPercent = Number(profitPercent) || 0;

  // Calculations
  const skeinsNeeded =
    safeGramsPerSkein > 0
      ? Math.ceil(safeUsedGrams / safeGramsPerSkein)
      : 0;
  const yarnCost = skeinsNeeded * safeSkeinPrice;
  const materialCost = yarnCost + safeExtraCosts;
  const laborCost = safeHours * safeHourPrice;
  const baseCost = materialCost + laborCost;
  const profit = baseCost * (safeProfitPercent / 100);
  const finalPrice = baseCost + profit;

  const fmt = (n: number) =>
    `${curr.symbol}${n.toFixed(2)}`;

  const parseInput = (
    val: string,
    setter: (v: NumOrEmpty) => void
  ) => {
    if (val === "" || val === ".") {
      setter(val === "." ? 0 : "");
    } else {
      const n = parseFloat(val);
      if (!isNaN(n)) setter(n);
    }
  };

  const resetAll = () => {
    setSkeinPrice("");
    setGramsPerSkein("");
    setUsedGrams("");
    setExtraCosts("");
    setHours("");
    setHourPrice("");
    setProfitPercent("");
  };

  const hasResults = baseCost > 0;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>StitchPrice</Text>
          <Text style={styles.headerSub}>Calculadora de precios 🧶</Text>
        </View>
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={resetAll}
          activeOpacity={0.7}
        >
          <Text style={styles.resetText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Currency Picker */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>MONEDA</Text>
          <TouchableOpacity
            style={styles.currencyBtn}
            onPress={() => setShowCurrencyModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.currencyBtnText}>
              {currency}
            </Text>
            <Text style={styles.currencyBtnSub}>
              {curr.name}
            </Text>
            <Text style={styles.currencyChevron}>▾</Text>
          </TouchableOpacity>
        </View>

        {/* Materiales */}
        <View style={styles.card}>
          <SectionHeader title="Materiales" emoji="🪢" />

          <StyledInput
            label="Precio por madeja"
            prefix={curr.symbol}
            value={skeinPrice === "" ? "" : String(skeinPrice)}
            onChangeText={(v) => parseInput(v, setSkeinPrice)}
            placeholder="0.00"
          />
          <StyledInput
            label="Gramos por madeja"
            suffix="g"
            value={gramsPerSkein === "" ? "" : String(gramsPerSkein)}
            onChangeText={(v) => parseInput(v, setGramsPerSkein)}
            placeholder="50"
          />
          <StyledInput
            label="Gramos usados en el proyecto"
            suffix="g"
            value={usedGrams === "" ? "" : String(usedGrams)}
            onChangeText={(v) => parseInput(v, setUsedGrams)}
            placeholder="0"
          />

          {/* Mini resultado de madejas */}
          {skeinsNeeded > 0 && (
            <View style={styles.miniResult}>
              <Text style={styles.miniResultText}>
                🧶 Madejas necesarias:{" "}
                <Text style={styles.miniResultBold}>{skeinsNeeded}</Text>
              </Text>
              <Text style={styles.miniResultText}>
                💰 Costo de estambre:{" "}
                <Text style={styles.miniResultBold}>{fmt(yarnCost)}</Text>
              </Text>
            </View>
          )}

          <StyledInput
            label="Otros costos (ojitos, botones, alambre…)"
            prefix={curr.symbol}
            value={extraCosts === "" ? "" : String(extraCosts)}
            onChangeText={(v) => parseInput(v, setExtraCosts)}
            placeholder="0.00"
          />
        </View>

        {/* Mano de obra */}
        <View style={styles.card}>
          <SectionHeader title="Mano de obra" emoji="⏱️" />

          <StyledInput
            label="Horas trabajadas"
            suffix="hrs"
            value={hours === "" ? "" : String(hours)}
            onChangeText={(v) => parseInput(v, setHours)}
            placeholder="0"
          />
          <StyledInput
            label="Precio por hora"
            prefix={curr.symbol}
            value={hourPrice === "" ? "" : String(hourPrice)}
            onChangeText={(v) => parseInput(v, setHourPrice)}
            placeholder="0.00"
          />
        </View>

        {/* Ganancia */}
        <View style={styles.card}>
          <SectionHeader title="Ganancia" emoji="📈" />

          <StyledInput
            label="Porcentaje de ganancia"
            suffix="%"
            value={profitPercent === "" ? "" : String(profitPercent)}
            onChangeText={(v) => parseInput(v, setProfitPercent)}
            placeholder="0"
          />

          <View style={styles.quickBtns}>
            <Text style={styles.quickLabel}>Sugerido:</Text>
            {[10, 20, 30, 50].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.quickBtn,
                  profitPercent === p && styles.quickBtnActive,
                ]}
                onPress={() => setProfitPercent(p)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.quickBtnText,
                    profitPercent === p && styles.quickBtnTextActive,
                  ]}
                >
                  {p}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Resultado */}
        <View style={[styles.card, styles.resultCard]}>
          <SectionHeader title="Resultado" emoji="✨" />

          <ResultRow label="Costo de materiales" value={fmt(materialCost)} />
          <ResultRow label="Mano de obra" value={fmt(laborCost)} />
          <ResultRow label="Costo real" value={fmt(baseCost)} />
          <ResultRow label={`Ganancia (${safeProfitPercent}%)`} value={fmt(profit)} />

          <View style={styles.finalPriceBox}>
            <Text style={styles.finalPriceLabel}>Precio sugerido</Text>
            <Text style={styles.finalPriceValue}>
              {hasResults ? fmt(finalPrice) : `${curr.symbol}0.00`}
            </Text>
            <Text style={styles.finalPriceNote}>
              * El precio final lo decides tú según tu mercado y experiencia.
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Modal de moneda */}
      <Modal
        visible={showCurrencyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCurrencyModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowCurrencyModal(false)}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Selecciona moneda</Text>
            <FlatList
              data={Object.entries(Currencies)}
              keyExtractor={([code]) => code}
              renderItem={({ item: [code, info] }) => (
                <TouchableOpacity
                  style={[
                    styles.currencyOption,
                    currency === code && styles.currencyOptionActive,
                  ]}
                  onPress={() => {
                    setCurrency(code);
                    setShowCurrencyModal(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.currencyOptionCode,
                      currency === code && styles.currencyOptionCodeActive,
                    ]}
                  >
                    {code}
                  </Text>
                  <Text style={styles.currencyOptionName}>{info.name}</Text>
                  {currency === code && (
                    <Text style={styles.currencyCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.separator} />
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.green.main,
  },
  header: {
    backgroundColor: Colors.green.dark,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 8,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: Colors.neutral.white,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.green.pale,
    marginTop: 2,
  },
  resetBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  resetText: {
    color: Colors.neutral.white,
    fontSize: 13,
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.neutral[100],
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  resultCard: {
    borderWidth: 1.5,
    borderColor: Colors.amber.pale,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.amber.main,
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  // Currency button
  currencyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.green.wash,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1.5,
    borderColor: Colors.green.pale,
    gap: 8,
  },
  currencyBtnText: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.green.dark,
  },
  currencyBtnSub: {
    flex: 1,
    fontSize: 14,
    color: Colors.neutral[500],
  },
  currencyChevron: {
    fontSize: 18,
    color: Colors.green.main,
  },

  // Mini result
  miniResult: {
    backgroundColor: Colors.green.wash,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.green.main,
    gap: 4,
  },
  miniResultText: {
    fontSize: 13,
    color: Colors.neutral[500],
  },
  miniResultBold: {
    fontWeight: "700",
    color: Colors.green.dark,
  },

  // Quick profit buttons
  quickBtns: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
    flexWrap: "wrap",
  },
  quickLabel: {
    fontSize: 12,
    color: Colors.neutral[300],
  },
  quickBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.green.wash,
    borderWidth: 1.5,
    borderColor: Colors.green.pale,
  },
  quickBtnActive: {
    backgroundColor: Colors.green.main,
    borderColor: Colors.green.main,
  },
  quickBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.green.dark,
  },
  quickBtnTextActive: {
    color: Colors.neutral.white,
  },

  // Final price
  finalPriceBox: {
    backgroundColor: Colors.amber.wash,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.amber.pale,
  },
  finalPriceLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.amber.main,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  finalPriceValue: {
    fontSize: 36,
    fontWeight: "900",
    color: Colors.highlight,
    letterSpacing: -1,
  },
  finalPriceNote: {
    fontSize: 11,
    color: Colors.neutral[300],
    textAlign: "center",
    marginTop: 8,
    lineHeight: 15,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: Colors.neutral.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: "70%",
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.neutral[100],
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.neutral[700],
    textAlign: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  currencyOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  currencyOptionActive: {
    backgroundColor: Colors.green.wash,
  },
  currencyOptionCode: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.neutral[700],
    width: 48,
  },
  currencyOptionCodeActive: {
    color: Colors.green.dark,
  },
  currencyOptionName: {
    flex: 1,
    fontSize: 14,
    color: Colors.neutral[500],
  },
  currencyCheck: {
    fontSize: 18,
    color: Colors.green.main,
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: Colors.neutral[100],
    marginHorizontal: 20,
  },
});
